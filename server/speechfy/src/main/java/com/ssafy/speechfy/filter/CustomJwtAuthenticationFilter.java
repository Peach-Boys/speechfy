package com.ssafy.speechfy.filter;

import com.ssafy.speechfy.entity.User;
import com.ssafy.speechfy.service.JwtService;
import com.ssafy.speechfy.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
public class CustomJwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String CLAIM_TYPE = "type";
    private static final String TYPE_ACCESS = "access";
    public static final String COOKIE_NAME = "speechfyAccessToken";
    public static final String REFRESH_COOKIE_NAME = "speechfyRefreshToken";

    @Value("${spring.security.oauth2.client.jwt.access-token-time}")
    private int AccessTokenTime;

    private final JwtDecoder jwtDecoder;
    private final UserService userService;
    private final JwtService jwtService;

    private static final SecurityContextHolderStrategy securityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = resolveToken(request);
        Jwt jwt;
        try {
            jwt = jwtDecoder.decode(token);
        } catch (JwtException e) {
            // 만약 만료 관련 예외라면 refresh token을 사용해 access token 재발급 시도
            System.out.println(e.getMessage());
            String refreshToken = resolveRefreshToken(request);
            if (refreshToken != null && !refreshToken.isEmpty()) {
                try {
                    // refresh 토큰 검증
                    Jwt refreshJwt = jwtDecoder.decode(refreshToken);
                    if (!Objects.equals(refreshJwt.getClaim(CLAIM_TYPE), "refresh")) {
                        // refresh 토큰의 타입이 "refresh"가 아니면 실패 처리
                        filterChain.doFilter(request, response);
                        return;
                    }
                    // refresh 토큰의 subject에서 사용자 ID 파싱
                    int refreshUserId = Integer.parseInt(refreshJwt.getSubject());
                    // DB에서 해당 사용자 조회 (refresh 토큰에 해당하는 사용자 검증)
                    User refreshUser = userService.findById(refreshUserId).orElse(null);
                    if (refreshUser == null) {
                        filterChain.doFilter(request, response);
                        return;
                    }
                    // refresh 토큰이 유효하다면 새로운 access token 발급
                    String newAccessToken = jwtService.generateAccessToken(refreshUser);
                    // 새 access token을 쿠키에 저장
                    Cookie newAccessCookie = new Cookie("speechfyAccessToken", newAccessToken);
                    newAccessCookie.setHttpOnly(true);
                    newAccessCookie.setPath("/");
                    newAccessCookie.setMaxAge(AccessTokenTime);
                    response.addCookie(newAccessCookie);
                    // 새 access token으로 다시 디코딩
                    jwt = jwtDecoder.decode(newAccessToken);
                } catch (Exception ex) {
                    // refresh 실패 시, 다음 필터로 넘어감(인증 정보 없음)
                    filterChain.doFilter(request, response);
                    return;
                }
            } else {
                filterChain.doFilter(request, response);
                return;
            }
        }

        if (!Objects.equals(jwt.getClaim(CLAIM_TYPE), TYPE_ACCESS)) {
            filterChain.doFilter(request, response);
            return;
        }

        int userId;
        try {
            userId = Integer.parseInt(jwt.getSubject());
        } catch (NumberFormatException e) {
            filterChain.doFilter(request, response);
            return;
        }

        User userDetails = userService.findById(userId).orElse(null);
        if (userDetails == null) {
            filterChain.doFilter(request, response);
            return;
        }
        System.out.println(userDetails.getId());
        Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(userDetails, null, List.of());

        SecurityContext securityContext = securityContextHolderStrategy.createEmptyContext();
        securityContext.setAuthentication(authentication);
        securityContextHolderStrategy.setContext(securityContext);
        try {
            filterChain.doFilter(request, response);
        } finally {
//            securityContextHolderStrategy.clearContext();
        }
    }

    private String resolveToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie: cookies) {
                if (Objects.equals(COOKIE_NAME, cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
    private String resolveRefreshToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (Objects.equals(REFRESH_COOKIE_NAME, cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}

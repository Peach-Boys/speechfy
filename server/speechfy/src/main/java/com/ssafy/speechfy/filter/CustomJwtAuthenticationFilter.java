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
import lombok.extern.slf4j.Slf4j;
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

@Slf4j
@RequiredArgsConstructor
public class CustomJwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String CLAIM_TYPE = "type";
    private static final String TYPE_ACCESS = "access";

    @Value("${spring.security.oauth2.client.jwt.access-token-time}")
    private int AccessTokenTime;

    private final JwtDecoder jwtDecoder;
    private final UserService userService;
    private final JwtService jwtService;

    private static final SecurityContextHolderStrategy securityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = jwtService.resolveToken(request);
        Jwt jwt;
        try {
            jwt = jwtDecoder.decode(token);
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

            Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(userDetails, null, List.of());
            SecurityContext securityContext = securityContextHolderStrategy.createEmptyContext();
            securityContext.setAuthentication(authentication);
            securityContextHolderStrategy.setContext(securityContext);
            try {
                filterChain.doFilter(request, response);
            } finally {
                securityContextHolderStrategy.clearContext();
            }
        } catch (JwtException e) {
            // 만약 만료 관련 예외라면 refresh token을 사용해 access token 재발급 시도
            filterChain.doFilter(request, response);
        }
    }

}

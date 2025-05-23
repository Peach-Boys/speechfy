package com.ssafy.speechfy.controller;

import com.nimbusds.jose.JOSEException;
import com.ssafy.speechfy.dto.user.loginDto;
import com.ssafy.speechfy.entity.User;
import com.ssafy.speechfy.service.JwtService;
import com.ssafy.speechfy.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.bind.annotation.*;
import com.ssafy.speechfy.oauth.KakaoUtil;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class userController {

    private final UserService userService;
    private final JwtService jwtService;
    private final JwtDecoder jwtDecoder;

    @Value("${spring.security.oauth2.client.jwt.access-token-time}")
    private int AccessTokenTime;

    @Value("${spring.security.oauth2.client.jwt.refresh-token-time}")
    private int RefreshTokenTime;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody loginDto loginDto, HttpServletResponse response) {
        User user;
        user = userService.signInForKakao(loginDto);


        // JWT 토큰 생성 및 쿠키 설정
        try {
            log.info("before_created");
            String accessToken = jwtService.generateAccessToken(user);
            String refreshToken = jwtService.generateRefreshToken(user);
            // 넣어주는 방법 여러가지 중에 쿠키에 넣는 것을 선택
            Cookie accessTokenCookie = new Cookie("speechfyAccessToken", accessToken);
            accessTokenCookie.setMaxAge(AccessTokenTime);
            accessTokenCookie.setHttpOnly(true);
            accessTokenCookie.setPath("/");
            accessTokenCookie.setSecure(true);
            accessTokenCookie.setAttribute("SameSite", "None");

            Cookie refreshTokenCookie = new Cookie("speechfyRefreshToken", refreshToken);
            refreshTokenCookie.setMaxAge(RefreshTokenTime);
            refreshTokenCookie.setHttpOnly(true);
            refreshTokenCookie.setPath("/api/refresh");
            refreshTokenCookie.setSecure(true);
            refreshTokenCookie.setAttribute("SameSite", "None");

            response.addCookie(accessTokenCookie);
            response.addCookie(refreshTokenCookie);

        } catch (JOSEException e){
            log.error("Failed to read key files. Error: {}", e.getMessage(), e);
            throw new IllegalStateException("Failed to mint JWS", e);
        }

        return ResponseEntity.ok("Login successful");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie accessTokenCookie = new Cookie("speechfyAccessToken", null);
        accessTokenCookie.setMaxAge(0);
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setPath("/");
        accessTokenCookie.setSecure(true);
        accessTokenCookie.setAttribute("SameSite", "None");

        Cookie refreshTokenCookie = new Cookie("speechfyRefreshToken", null);
        refreshTokenCookie.setMaxAge(0);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setPath("/api/refresh");
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setAttribute("SameSite", "None");

        response.addCookie(accessTokenCookie);
        response.addCookie(refreshTokenCookie);

        return ResponseEntity.ok("로그아웃 성공");
    }

    @GetMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request, HttpServletResponse response) {
        String oldRefreshToken = jwtService.resolveRefreshToken(request);

        if (oldRefreshToken == null || oldRefreshToken.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token is missing");
        }

        try {
            log.info("before_created");
            Jwt refreshJwt = jwtDecoder.decode(oldRefreshToken);
            if (!Objects.equals(refreshJwt.getClaim("type"), "refresh")) {
                // refresh 토큰의 타입이 "refresh"가 아니면 실패 처리
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token is missing");
            }
            // refresh 토큰의 subject에서 사용자 ID 파싱
            int refreshUserId = Integer.parseInt(refreshJwt.getSubject());
            // DB에서 해당 사용자 조회 (refresh 토큰에 해당하는 사용자 검증)
            User refreshUser = userService.findById(refreshUserId).orElse(null);
            if (refreshUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token is missing");
            }
            String accessToken = jwtService.generateAccessToken(refreshUser);
            String refreshToken = jwtService.generateRefreshToken(refreshUser);
            // 넣어주는 방법 여러가지 중에 쿠키에 넣는 것을 선택
            Cookie accessTokenCookie = new Cookie("speechfyAccessToken", accessToken);
            accessTokenCookie.setMaxAge(AccessTokenTime);
            accessTokenCookie.setHttpOnly(true);
            accessTokenCookie.setPath("/");
            accessTokenCookie.setSecure(true);
            accessTokenCookie.setAttribute("SameSite", "None");

            Cookie refreshTokenCookie = new Cookie("speechfyRefreshToken", refreshToken);
            refreshTokenCookie.setMaxAge(RefreshTokenTime);
            refreshTokenCookie.setHttpOnly(true);
            refreshTokenCookie.setPath("/api/refresh");
            refreshTokenCookie.setSecure(true);
            refreshTokenCookie.setAttribute("SameSite", "None");

            response.addCookie(accessTokenCookie);
            response.addCookie(refreshTokenCookie);

        } catch (JOSEException e){
            log.error("Failed to read key files. Error: {}", e.getMessage(), e);
            throw new IllegalStateException("Failed to mint JWS", e);
        }

        return ResponseEntity.ok("Token refreshed successfully");
    }

//    @GetMapping
//    public ResponseEntity<userResponseDto> getUser() {
//
//        return ResponseEntity.ok(null);
//    }
//    @PatchMapping
//    public ResponseEntity<?> updateUser(@RequestBody userUpdateDto userUpdateDto) {
//
//        return ResponseEntity.ok(null);
//    }
//    @DeleteMapping
//    public ResponseEntity<?> deleteUser() {
//
//        return ResponseEntity.ok(null);
//    }
}

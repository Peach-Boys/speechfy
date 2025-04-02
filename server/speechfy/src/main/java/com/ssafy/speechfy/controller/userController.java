package com.ssafy.speechfy.controller;

import com.nimbusds.jose.JOSEException;
import com.ssafy.speechfy.dto.user.loginDto;
import com.ssafy.speechfy.entity.User;
import com.ssafy.speechfy.service.JwtService;
import com.ssafy.speechfy.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ssafy.speechfy.oauth.KakaoUtil;

import java.util.HashMap;
import java.util.Map;
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class userController {

    private final UserService userService;
    private final JwtService jwtService;

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
            String accessToken = jwtService.generateAccessToken(user);
            String refreshToken = jwtService.generateRefreshToken(user);

            // 넣어주는 방법 여러가지 중에 쿠키에 넣는 것을 선택
            Cookie accessTokenCookie = new Cookie("speechfyAccessToken", accessToken);
            accessTokenCookie.setMaxAge(AccessTokenTime);
            accessTokenCookie.setHttpOnly(true);
            accessTokenCookie.setPath("/");
            accessTokenCookie.setSecure(true);
            accessTokenCookie.setAttribute("SameSite", "None");
            accessTokenCookie.setHttpOnly(true);

            Cookie refreshTokenCookie = new Cookie("speechfyRefreshToken", refreshToken);
            refreshTokenCookie.setMaxAge(RefreshTokenTime);
            refreshTokenCookie.setHttpOnly(true);
            refreshTokenCookie.setPath("/");
            refreshTokenCookie.setSecure(true);
            refreshTokenCookie.setAttribute("SameSite", "None");
            refreshTokenCookie.setHttpOnly(true);

            response.addCookie(accessTokenCookie);
            response.addCookie(refreshTokenCookie);

            log.info("Access token = {}, Refresh token = {}", accessToken, refreshToken);
        } catch (JOSEException e){
            throw new IllegalStateException("Failed to mint JWS", e);
        }

        return ResponseEntity.ok("Login successful");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie accessTokenCookie = new Cookie("speechfyAccessToken", null);
        accessTokenCookie.setPath("/");
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setMaxAge(0);  // 쿠키 삭제

        Cookie refreshTokenCookie = new Cookie("speechfyRefreshToken", null);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setMaxAge(0);  // 쿠키 삭제

        response.addCookie(accessTokenCookie);
        response.addCookie(refreshTokenCookie);

        return ResponseEntity.ok("로그아웃 성공");
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

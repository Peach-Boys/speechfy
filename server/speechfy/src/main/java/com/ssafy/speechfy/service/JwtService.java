package com.ssafy.speechfy.service;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JOSEObjectType;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.mint.ConfigurableJWSMinter;
import com.nimbusds.jose.mint.DefaultJWSMinter;
import com.nimbusds.jose.proc.SecurityContext;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.proc.ConfigurableJWTProcessor;
import com.nimbusds.jwt.proc.DefaultJWTProcessor;
import com.ssafy.speechfy.entity.User;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtService {

    private static final String CLAIM_TYPE = "type";
    private static final String TYPE_ACCESS = "access";
    private static final String TYPE_REFRESH = "refresh";
    private static final String JWT_ISSUER = "speechfy";
    private static final int ACCESS_EXPIRES_IN_SECONDS = 5 * 60;
    private static final int REFRESH_EXPIRES_IN_SECONDS = 14 * 24 * 60 * 60;
    public static final String COOKIE_NAME = "speechfyAccessToken";
    public static final String REFRESH_COOKIE_NAME = "speechfyRefreshToken";

    private final JwtKeyService jwtKeyService;

    @Getter
    private final ConfigurableJWTProcessor<SecurityContext> jwtProcessor = new DefaultJWTProcessor<>();
    private final ConfigurableJWSMinter<SecurityContext> jwsMinter = new DefaultJWSMinter<>();
    private final UserService userService;

    @PostConstruct
    void refreshKeys() throws IOException {
        this.jwtKeyService.loadKey();
        this.jwtProcessor.setJWSKeySelector(this.jwtKeyService.getPublicJwsKeySelector());
        this.jwsMinter.setJWKSource(this.jwtKeyService.getPrivateJwkSource());
    }

    public String generateAccessToken(User user) throws JOSEException {
        JWSHeader header = new JWSHeader.Builder(this.jwtKeyService.getJwsAlgorithm())
                .type(JOSEObjectType.JWT)
                .build();
        Instant expiresAt = Instant.now()
                .plusSeconds(ACCESS_EXPIRES_IN_SECONDS)
                .truncatedTo(ChronoUnit.SECONDS);
        Payload payload = new JWTClaimsSet.Builder()
                .issuer(JWT_ISSUER)
                .subject(String.valueOf(user.getId()))
                .expirationTime(Date.from(expiresAt))
                .claim(CLAIM_TYPE, TYPE_ACCESS)
                .build()
                .toPayload();
        try {
            String token = this.jwsMinter.mint(header, payload, null).serialize();
            return token;
        } catch (Exception e) {
            log.error("JWS 토큰 생성 중 예외 발생: {}", e.getMessage(), e);
            throw e;  // 또는 적절한 예외 처리
        }
    }

    public String generateRefreshToken(User user) throws JOSEException {
        log.info("Generate refresh token1");
        JWSHeader header = new JWSHeader.Builder(this.jwtKeyService.getJwsAlgorithm())
                .type(JOSEObjectType.JWT)
                .build();
        Instant expiresAt = Instant.now()
                .plusSeconds(REFRESH_EXPIRES_IN_SECONDS)
                .truncatedTo(ChronoUnit.SECONDS);
        Payload payload = new JWTClaimsSet.Builder()
                .issuer(JWT_ISSUER)
                .subject(String.valueOf(user.getId()))
                .expirationTime(Date.from(expiresAt))
                .claim(CLAIM_TYPE, TYPE_REFRESH)
                .build()
                .toPayload();
        return this.jwsMinter.mint(header, payload, null).serialize();
    }

    public String resolveToken(HttpServletRequest request) {
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
    public String resolveRefreshToken(HttpServletRequest request) {
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

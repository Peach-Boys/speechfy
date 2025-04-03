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
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

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
        log.info("Generate access token");
        JWSHeader header = new JWSHeader.Builder(this.jwtKeyService.getJwsAlgorithm())
                .type(JOSEObjectType.JWT)
                .build();
        log.info("Generate access token2");
        Instant expiresAt = Instant.now()
                .plusSeconds(ACCESS_EXPIRES_IN_SECONDS)
                .truncatedTo(ChronoUnit.SECONDS);
        log.info("Generate access token3");
        Payload payload = new JWTClaimsSet.Builder()
                .issuer(JWT_ISSUER)
                .subject(String.valueOf(user.getId()))
                .expirationTime(Date.from(expiresAt))
                .claim(CLAIM_TYPE, TYPE_ACCESS)
                .build()
                .toPayload();
        log.info("Generate access token4");
        return this.jwsMinter.mint(header, payload, null).serialize();
    }

    public String generateRefreshToken(User user) throws JOSEException {
        log.info("Generate refresh token1");
        JWSHeader header = new JWSHeader.Builder(this.jwtKeyService.getJwsAlgorithm())
                .type(JOSEObjectType.JWT)
                .build();
        log.info("Generate refresh token2");
        Instant expiresAt = Instant.now()
                .plusSeconds(REFRESH_EXPIRES_IN_SECONDS)
                .truncatedTo(ChronoUnit.SECONDS);
        log.info("Generate refresh token3");
        Payload payload = new JWTClaimsSet.Builder()
                .issuer(JWT_ISSUER)
                .subject(String.valueOf(user.getId()))
                .expirationTime(Date.from(expiresAt))
                .claim(CLAIM_TYPE, TYPE_REFRESH)
                .build()
                .toPayload();
        log.info("Generate refresh token4");
        return this.jwsMinter.mint(header, payload, null).serialize();
    }
}

package com.ssafy.speechfy.service;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.KeySourceException;
import com.nimbusds.jose.jwk.ECKey;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.JWSAlgorithmFamilyJWSKeySelector;
import com.nimbusds.jose.proc.JWSKeySelector;
import com.nimbusds.jose.proc.SecurityContext;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
@Slf4j
@Getter
@RequiredArgsConstructor
public class JwtKeyService {

    private final JWSAlgorithm jwsAlgorithm = JWSAlgorithm.ES256;
    private JWSKeySelector<SecurityContext> publicJwsKeySelector;
    private JWKSource<SecurityContext> privateJwkSource;

    @Value("${spring.security.oauth2.key.private}")
    private String oauth2PrivateKeyPath;

    @Value("${spring.security.oauth2.key.public}")
    private String oauth2PublicKeyPath;

    public void loadKey() {
        try {
            String privateKeyString = readFile(oauth2PrivateKeyPath);
            String publicKeyString = readFile(oauth2PublicKeyPath);
            JWKSource<SecurityContext> privateJwkSource = parseKey(privateKeyString);
            JWKSource<SecurityContext> publicJwkSource = parseKey(publicKeyString);

            this.privateJwkSource = privateJwkSource;
            this.publicJwsKeySelector = createJWSKeySelector(publicJwkSource);
        } catch (IOException e) {
            log.error("Failed to read key files. Private: {}, Public: {}, Error: {}", 
                      oauth2PrivateKeyPath, oauth2PublicKeyPath, e.getMessage(), e);
        } catch (IllegalArgumentException e) {
            log.error("Invalid key format: {}", e.getMessage(), e);
        } catch (Exception e) {
            log.error("Unexpected error while loading JWT keys: {}", e.getMessage(), e);
        }
    }

    private JWSKeySelector<SecurityContext> createJWSKeySelector(JWKSource<SecurityContext> jwkSource) {
        try {
            return JWSAlgorithmFamilyJWSKeySelector.fromJWKSource(jwkSource);
        } catch (KeySourceException e) {
            log.error("Failed to create JWSKeySelector: {}", e.getMessage(), e);
            throw new IllegalArgumentException("Failed to create JWSKeySelector.", e);
        }
    }

    private JWKSource<SecurityContext> parseKey(String keyString) {
        try {
            JWK jwk = ECKey.parseFromPEMEncodedObjects(keyString);
            return new ImmutableJWKSet<>(new JWKSet(jwk));
        } catch (JOSEException e) {
            log.error("Invalid PEM key: {}", e.getMessage(), e);
            System.out.println("로드안됨 ");
            throw new IllegalArgumentException("Invalid PEM key", e);
        }
    }

    private String readFile(String path) throws IOException {
        ClassPathResource resource = new ClassPathResource(path);
        return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
    }
}

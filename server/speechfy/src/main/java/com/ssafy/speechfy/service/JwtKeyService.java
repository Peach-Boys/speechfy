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
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
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

    public void loadKey() throws IOException {
        String privateKeyString = readFile(oauth2PrivateKeyPath);
        String publicKeyString = readFile(oauth2PublicKeyPath);

        JWKSource<SecurityContext> privateJwkSource = parseKey(privateKeyString);
        JWKSource<SecurityContext> publicJwkSource = parseKey(publicKeyString);

        this.privateJwkSource = privateJwkSource;
        this.publicJwsKeySelector = createJWSKeySelector(publicJwkSource);
    }

    private JWSKeySelector<SecurityContext> createJWSKeySelector(JWKSource<SecurityContext> jwkSource) {
        try {
            return JWSAlgorithmFamilyJWSKeySelector.fromJWKSource(jwkSource);
        } catch (KeySourceException e) {
            throw new IllegalArgumentException("Failed to create JWSKeySelector.", e);
        }
    }

    private JWKSource<SecurityContext> parseKey(String keyString) {
        JWK jwk;
        try {
            jwk = ECKey.parseFromPEMEncodedObjects(keyString);
        } catch (JOSEException e) {
            throw new IllegalArgumentException("Invalid PEM key", e);
        }

        return new ImmutableJWKSet<>(new JWKSet(jwk));
    }

    private String readFile(String path) throws IOException {
        ClassPathResource resource = new ClassPathResource(path);
        return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
    }
}

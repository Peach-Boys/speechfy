package com.ssafy.speechfy.oauth;

import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.MediaType;

import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class KakaoUtil {

    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private String REST_API_KEY;

    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String REDIRECT_URI;

    private final WebClient.Builder webClientBuilder;

    public Map<String, String> getKakaoAccessToken(String code) {
        String tokenUrl = "https://kauth.kakao.com/oauth/token";

        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("grant_type", "authorization_code");
        formData.add("client_id", REST_API_KEY);
        formData.add("redirect_uri", REDIRECT_URI);
        formData.add("code", code);

        Map<String, Object> tokenResponse = webClientBuilder.build()
                .post()
                .uri(tokenUrl)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromFormData(formData))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                .block();

        // 응답에서 access_token과 id_token 추출
        String accessToken = (String) tokenResponse.get("access_token");
        String idToken = (String) tokenResponse.get("id_token"); // id_token이 포함되어 있지 않으면 null일 수 있음



        Integer expiresIn = (Integer) tokenResponse.get("expires_in");
        Integer refreshExpiresIn = (Integer) tokenResponse.get("refresh_token_expires_in");
        System.out.println("accessToken 만료: "+expiresIn);
        System.out.println("refresh 만료: "+refreshExpiresIn);

        Map<String, String> result = new HashMap<>();
        result.put("access_token", accessToken);
        result.put("id_token", idToken);
        return result;
    }
}

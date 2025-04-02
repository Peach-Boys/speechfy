package com.ssafy.speechfy.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.jose.JOSEException;
import com.ssafy.speechfy.dto.user.OAuth2UserDto;
import com.ssafy.speechfy.dto.user.loginDto;
import com.ssafy.speechfy.entity.User;
import com.ssafy.speechfy.oauth.KakaoUtil;
import com.ssafy.speechfy.repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.servlet.http.Cookie;
import jakarta.validation.constraints.Null;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final KakaoUtil kakaoUtil;

    public UserService(UserRepository userRepository, KakaoUtil kakaoUtil) {
        this.userRepository = userRepository;
        this.kakaoUtil = kakaoUtil;
    }

    // 유저 회원가입 및 로그인
    @Transactional
    public User signInForKakao(loginDto loginDto) {

        // 카카오 액세스 토큰 요청
        Map<String, String> map = new HashMap<>();
        try {
            String code = loginDto.getCode();
            map = kakaoUtil.getKakaoAccessToken(code);
        } catch (Error e) {
            System.out.println("--------------------");
        }
        String kakaoAccessToken = map.get("access_token");
        String idToken = map.get("id_token");

        if (kakaoAccessToken == null) {
            throw new RuntimeException("Kakao access token is null");
        }

        // 유저 정보 추출하여 반환 또는 생성
        Map<String, Object> userInfo = new HashMap<>();
        User user = new User();
        try {
             userInfo = extractUserInfoFromIdToken(idToken);
             String authId = (String) userInfo.get("sub");
            Optional<User> newUser = userRepository.findByAuthId(authId);
            if (newUser.isPresent()) {
                user = newUser.get();
            } else {
                user.setAuthId(authId);
                user.setNickname(userInfo.get("nickname").toString());
                user.setAuthProvider("kakao");
                userRepository.save(user);
            }
        } catch (Exception e) {
            System.out.println("UserService.signInForKakao: " + e);
        }
        // 토큰 생성해서 반환해야 함

        return user;
    }

    public Void deleteUser() {

       // workService.deleteStudioList();
        return null;
    }

    // 토큰에서 정보 추출
    public Map<String, Object> extractUserInfoFromIdToken(String idToken) throws Exception {
        // JWT는 header.payload.signature 형식이므로, 점(.)을 기준으로 분리
        String[] parts = idToken.split("\\.");
        if (parts.length < 2) {
            throw new IllegalArgumentException("잘못된 ID 토큰 형식입니다.");
        }
        // 두 번째 부분(payload) 추출 Base64 디코딩
        String payload = parts[1];
        byte[] decodedBytes = Base64.getUrlDecoder().decode(payload);

        // JSON 문자열을 Map으로 변환
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> userInfo = mapper.readValue(decodedBytes, Map.class);
        return userInfo;
    }

    // 필터에서 유저 찾았을시 유저 반환
    public User findByAuthId(OAuth2UserDto oAuth2UserDto) {
        Optional<User> userOptional = userRepository.findByAuthId(oAuth2UserDto.getAuthId());

        if (userOptional.isPresent()) {
            return userOptional.get();
        }

        return null;
    }

    public Optional<User> findById(Integer id) {
        return (Optional<User>) userRepository.findById(id);
    }
}

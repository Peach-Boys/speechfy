package com.ssafy.speechfy.service;

import com.ssafy.speechfy.dto.user.OAuth2UserDto;
import com.ssafy.speechfy.entity.CustomOAuth2User;
import com.ssafy.speechfy.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2ErrorCodes;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserService userService;

    // 필터에서 로그인 검증. 유저 반환
    // provider: provider, authId: name
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        String authProvider = userRequest.getClientRegistration().getRegistrationId();  // "kakao"
        // 현재 사용자 정보
        OAuth2User oAuth2User = super.loadUser(userRequest);
        log.info("oAuth2User: {}", oAuth2User);

        OAuth2UserDto oAuth2UserDto = switch (authProvider) {
            case "kakao" -> parseKakaoAttributes(oAuth2User);
            default -> throw new OAuth2AuthenticationException(new OAuth2Error(OAuth2ErrorCodes.INVALID_REQUEST));
        };
        oAuth2UserDto.setAuthProvider(authProvider);
        oAuth2UserDto.setAuthId(oAuth2User.getName());

        User user = userService.findByAuthId(oAuth2UserDto);

        return new CustomOAuth2User(oAuth2User, user);
    }

    private OAuth2UserDto parseKakaoAttributes(OAuth2User oAuth2User) {
        OAuth2UserDto dto = new OAuth2UserDto();

        Map<String, Object> kakaoAccount = oAuth2User.getAttribute("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
        dto.setProfileImage((String) profile.get("profile_image_url"));
        dto.setNickname((String) profile.get("nickname"));

        return dto;
    }
}

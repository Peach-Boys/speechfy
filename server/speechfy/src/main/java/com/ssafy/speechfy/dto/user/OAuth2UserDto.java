package com.ssafy.speechfy.dto.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OAuth2UserDto {

    private String authProvider;

    private String authId;

    private String nickname;

    private String profileImage;

    private String email;
}

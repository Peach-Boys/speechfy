package com.ssafy.speechfy.oauth;

import com.ssafy.speechfy.entity.CustomOAuth2User;
import com.ssafy.speechfy.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {

    public static Integer getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return null;
        }
        Object principal = authentication.getPrincipal();
        if (principal instanceof CustomOAuth2User) {
            return ((CustomOAuth2User) principal).getUser().getId();
        } else if (principal instanceof User) {
            return ((User) principal).getId();
        }
        return null;
    }

}

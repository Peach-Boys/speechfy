package com.ssafy.speechfy.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // 🔐 CSRF 보호 끄기
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // 🔓 모든 요청 인증 없이 허용
                )
                .formLogin().disable() // 🔒 로그인 페이지 비활성화
                .httpBasic().disable(); // 🔒 Basic 인증 비활성화
        return http.build();
    }
}
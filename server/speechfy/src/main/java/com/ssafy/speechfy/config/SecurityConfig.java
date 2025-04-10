package com.ssafy.speechfy.config;

import com.nimbusds.jose.proc.SecurityContext;
import com.nimbusds.jwt.JWTClaimNames;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.proc.ConfigurableJWTProcessor;
import com.nimbusds.jwt.proc.DefaultJWTClaimsVerifier;
import com.nimbusds.jwt.proc.JWTClaimsSetVerifier;
import com.ssafy.speechfy.filter.CustomJwtAuthenticationFilter;
import com.ssafy.speechfy.filter.LoggingFilter;
import com.ssafy.speechfy.service.JwtService;
import com.ssafy.speechfy.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.HeaderWriterFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Set;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public JwtDecoder jwtDecoder(JwtService jwtService) {
        ConfigurableJWTProcessor<SecurityContext> jwtProcessor = jwtService.getJwtProcessor();

        JWTClaimsSetVerifier<SecurityContext> jwtClaimsVerifier = new DefaultJWTClaimsVerifier<>(new JWTClaimsSet.Builder()
                .issuer("speechfy")
                .build(), Set.of(JWTClaimNames.SUBJECT));

        jwtProcessor.setJWTClaimsSetVerifier(jwtClaimsVerifier);

        return new NimbusJwtDecoder(jwtProcessor);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http, OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService,
            JwtDecoder jwtDecoder,
            UserService userService, JwtService jwtService) throws Exception {
        http
                .oauth2Client(Customizer.withDefaults())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))  // CORS 활성화
                .csrf(AbstractHttpConfigurer::disable) // CSRF 보호 끄기
                .httpBasic(AbstractHttpConfigurer::disable)
                .requestCache(AbstractHttpConfigurer::disable)
                .rememberMe(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                new AntPathRequestMatcher("/api/login", "POST"),
                                new AntPathRequestMatcher("/api/refresh", "GET"),
                                new AntPathRequestMatcher("/api/song/share/*", "GET"),
                                // 수정필요!!!
                                new AntPathRequestMatcher("/api/song/ai/presignedUrl", "GET"),
                                new AntPathRequestMatcher("/api/song/studios/*/ai/save", "POST")
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .exceptionHandling(exception -> exception
                                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                        // 필요하다면 accessDeniedHandler도 커스텀 처리
                )
                // 로깅 필터 추가 (HeaderWriterFilter 이전에 실행)
                .addFilterBefore(new LoggingFilter(), HeaderWriterFilter.class)
                // 쿠키에 담긴 JWT 토큰을 검증하는 커스텀 필터 추가 (UsernamePasswordAuthenticationFilter 이전에 실행)
                .addFilterBefore(new CustomJwtAuthenticationFilter(jwtDecoder, userService, jwtService), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    // CORS 설정 추가
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:5173"); // 허용할 도메인
        configuration.addAllowedOrigin("https://localhost:3000");
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedOrigin("http://j12b105.p.ssafy.io"); // 허용할 도메인
        configuration.addAllowedOrigin("https://j12b105.p.ssafy.io");
        configuration.addAllowedOrigin("http://musicgenb105.iptime.org:11111");
        configuration.addAllowedMethod("*"); // 모든 HTTP 메서드 허용
        configuration.addAllowedHeader("*"); // 모든 헤더 허용
        configuration.setAllowCredentials(true); // 쿠키 포함 허용

        return request -> configuration; // 요청마다 동일한 CORS 설정 반환
    }
}
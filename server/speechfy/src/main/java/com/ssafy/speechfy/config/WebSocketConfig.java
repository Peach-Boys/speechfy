package com.ssafy.speechfy.config;

import com.ssafy.speechfy.interceptor.JwtHandshakeInterceptor;
import com.ssafy.speechfy.service.JwtService;
import com.ssafy.speechfy.websocket.AIWebSocketHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@RequiredArgsConstructor
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    private final AIWebSocketHandler aiWebSocketHandler;
    private final JwtService jwtService;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        // 배포할 때는 wss로 바꿔야함
        registry.addHandler(aiWebSocketHandler, "/ws/ai").setAllowedOrigins("*")
                .addInterceptors(new JwtHandshakeInterceptor(jwtService));
    }
}
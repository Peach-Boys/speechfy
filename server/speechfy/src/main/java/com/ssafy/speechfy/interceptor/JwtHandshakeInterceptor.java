package com.ssafy.speechfy.interceptor;

import com.ssafy.speechfy.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

@Component
public class JwtHandshakeInterceptor implements HandshakeInterceptor {

    private final JwtService jwtService;

    public JwtHandshakeInterceptor(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public boolean beforeHandshake(ServerHttpRequest request,
                                   ServerHttpResponse response,
                                   WebSocketHandler wsHandler,
                                   Map<String, Object> attributes) {

        if (request instanceof ServletServerHttpRequest servletRequest) {
            HttpServletRequest httpRequest = servletRequest.getServletRequest();

            try {
                String token = jwtService.resolveToken(httpRequest); // 쿠키에서 꺼내기
                if (token != null) {
                    // JWT 파싱하여 유저 ID 추출
                    var jwt = jwtService.getJwtProcessor().process(token, null);
                    String userIdStr = jwt.getSubject();
                    Integer userId = Integer.parseInt(userIdStr);

                    // WebSocketSession의 attributes에 저장
                    attributes.put("userId", userId);
                    return true;
                }
            } catch (Exception e) {
                e.printStackTrace(); // 또는 로그
            }
        }

        // 인증 실패 시 연결 거절
        return false;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request,
                               ServerHttpResponse response,
                               WebSocketHandler wsHandler,
                               Exception exception) {
        // no-op
    }

}


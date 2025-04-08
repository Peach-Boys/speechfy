package com.ssafy.speechfy.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.speechfy.oauth.SecurityUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
public class AIWebSocketHandler extends TextWebSocketHandler {
    // 클라이언트 세션을 저장
    // userId → WebSocketSession
    private final Map<Integer, WebSocketSession> userSessions = new ConcurrentHashMap<>();

    /**
     * 클라이언트가 WebSocket 연결을 맺을 때 호출됨
     * userId를 시큐리티를 통해 받아 세션에 저장
     */
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // 예: ws://localhost:8080/ws/ai
        Integer userId = SecurityUtil.getCurrentUserId();

        if (userId != null) {
            userSessions.put(userId, session);
            log.info("WebSocket 연결 성공: userId={}", userId);
        } else {
            log.warn("userId 누락된 WebSocket 연결 시도");
            session.close();
        }
    }

    /**
     * 클라이언트가 연결 종료하면 세션 제거
     */
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        userSessions.entrySet().removeIf(entry -> entry.getValue().equals(session));
        log.info("WebSocket 연결 종료");
    }

    /**
     * 서버에서 특정 유저에게 메시지 전송 (AI 결과 전달용)
     */
    // DTO를 string으로 바꿔서 보내야함... TextMessage라서..... ObjectMapper 사용할 것
    // 여기서 바꾸자!
    public void sendToUser(int userId, Object dto) {
        WebSocketSession session = userSessions.get(userId);

        if (session != null && session.isOpen()) {
            try {
                Map<String, Object> payload = Map.of(
                        "message", "AI_COMPOSE_SUCCESS", // 또는 "ERROR", "IN_PROGRESS" 등
                        "data", dto
                );
                String json = new ObjectMapper().writeValueAsString(payload);
                session.sendMessage(new TextMessage(json));
                log.info("userId={} 에게 WebSocket 메시지 전송: {}", userId, json);
            } catch (Exception e) {
                log.error("WebSocket 메시지 전송 실패", e);
            }
        } else {
            log.warn("userId={} 의 WebSocket 세션이 없음", userId);
        }
    }
}

package com.ssafy.speechfy.exception;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    // 400 Bad Request (잘못된 요청)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgumentException(IllegalArgumentException e) {
        log.warn("IllegalArgumentException: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
    }

    // 400 post 입력 요소 부족
    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<Map<String, String>> handleNoResourceFoundException(NoResourceFoundException e) {
        log.warn("NoResourceFoundException: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", "post 입력폼을 확인해주세요."));
    }

    // 400 해당 자료 DB에 존재 X
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleEntityNotFoundException(EntityNotFoundException e) {
        log.warn("EntityNotFoundException: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", e.getMessage()));
    }

    // 400 인덱스 에러
    @ExceptionHandler(ArrayIndexOutOfBoundsException.class)
    public ResponseEntity<Map<String, String>> handleArrayIndexError(ArrayIndexOutOfBoundsException e) {
        log.warn("ArrayIndexOutOfBoundsException: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", "잘못된 enum 인덱스 접근입니다."));
    }

    // 400 에러
    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<Map<String, String>> handleNullPointerException(NullPointerException e) {
        log.error("NullPointException: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
    }

    // 401 UnAuthorized (권한 없음)
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Map<String, String>> handleAccessDeniedException(AccessDeniedException e) {
        log.warn("AccessDeniedException: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", e.getMessage()));
    }

    // 401 카카오 인증 코드 오류
    @ExceptionHandler(WebClientResponseException.BadRequest.class)
    public ResponseEntity<Map<String, String>> handleKakaoBadRequest(WebClientResponseException.BadRequest e) {
        log.warn("Kakao token request failed: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "인증 코드가 잘못되었습니다.", "message", e.getMessage()));
    }

    // 404 Not Found (리소스 없음)
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<Map<String, String>> handleNoSuchElementException(NoSuchElementException e) {
        log.error("NoSuchElementException: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
    }

    // 500 Internal Server Error (서버 오류)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneralException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
    }

    public static class UnauthorizedAccessException extends RuntimeException {
        public UnauthorizedAccessException(String message) {
            super(message);
        }
    }

}

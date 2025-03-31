package com.ssafy.speechfy.controller;

import com.ssafy.speechfy.dto.song.songListResponseDto;
import com.ssafy.speechfy.dto.user.userCreateDto;
import com.ssafy.speechfy.dto.user.userResponseDto;
import com.ssafy.speechfy.dto.user.userUpdateDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class userController {
    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestBody userCreateDto userCreateDto) {

        return null;
    }
    @PostMapping("/login")
    public ResponseEntity<?> login() {
        return ResponseEntity.ok(null);
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {

        return ResponseEntity.ok(null);
    }
    @GetMapping
    public ResponseEntity<userResponseDto> getUser() {

        return ResponseEntity.ok(null);
    }
    @PatchMapping
    public ResponseEntity<?> updateUser(@RequestBody userUpdateDto userUpdateDto) {

        return ResponseEntity.ok(null);
    }
    @DeleteMapping
    public ResponseEntity<?> deleteUser() {

        return ResponseEntity.ok(null);
    }
}

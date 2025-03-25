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
        return null;
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return null;
    }
    @GetMapping
    public ResponseEntity<userResponseDto> getUser() {
        return null;
    }
    @PatchMapping
    public ResponseEntity<?> updateUser(@RequestBody userUpdateDto userUpdateDto) {
        return null;
    }
    @DeleteMapping
    public ResponseEntity<?> deleteUser() {
        return null;
    }
}

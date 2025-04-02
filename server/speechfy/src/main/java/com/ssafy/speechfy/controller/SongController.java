package com.ssafy.speechfy.controller;

import com.ssafy.speechfy.dto.song.*;
import com.ssafy.speechfy.service.MusicGenService;
import com.ssafy.speechfy.service.S3Service;
import com.ssafy.speechfy.service.SongService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/song")
public class SongController {
    private final SongService songService;
    private final S3Service s3Service;
    private final MusicGenService musicGenService;

    private Integer getCurrentUserId() {
        return SecurityUtil.getCurrentUserId();
    }

    public SongController(SongService songService, S3Service s3Service, MusicGenService musicGenService) {
        this.songService = songService;
        this.s3Service = s3Service;
        this.musicGenService = musicGenService;
    }


    // 마이페이지 완성곡 리스트 반환
    @GetMapping("")
    public ResponseEntity<songListResponseDto> getSongList() {
        Integer userId = getCurrentUserId();
        Pageable pageable = PageRequest.of(0, 3);
        SongListResponseDto songListResponseDto = songService.getAllSongs(userId, pageable);

        return ResponseEntity.ok(songListResponseDto);
    }

    // 완성곡 변환 저장
    @PostMapping("/{studioId}")
    public ResponseEntity<?> createSongList(@PathVariable Integer studioId) {
        Integer userId = getCurrentUserId();
        return ResponseEntity.ok(null);
    }

    // 완성곡 다운로드 (사용하는 곳은 아직 없음. 일단 만들어둠)
    @GetMapping("/download/{songId}")
    public ResponseEntity<songResponseDto> getSong(@PathVariable Integer songId) {
        Integer userId = getCurrentUserId();
        songResponseDto dto = songService.getSongById(songId);
        return ResponseEntity.ok(dto);
    }

    // 완성곡 삭제
    @DeleteMapping("/download/{songId}")
    public ResponseEntity<String> deleteSong(@PathVariable Integer songId) {
        Integer userId = getCurrentUserId();
        songService.deleteSongById(songId, userId);
        return ResponseEntity.noContent().build();
    }

    // 앨범 커버 생성
    @GetMapping("/cover/{studioId}")
    public ResponseEntity<?> createCover(@PathVariable Integer studioId, @RequestBody ImageCreateDto createDto) {
        return ResponseEntity.ok(null);
    }

    // basicSong 저장
    // presignedUrl 생성 및 반환
    // Security 적용 전까지 일단 기존 방식으로 유저 인증
    @GetMapping("/basic/presignedUrl")
    public ResponseEntity<BasicSongPresignedUrlResponseDto> getPresignedUrl(@CookieValue(name = "userId") Integer userId) {
        BasicSongPresignedUrlResponseDto basicSongPresignedUrlResponse = songService.generateBasicSongPresignedUrl(userId);
        return ResponseEntity.ok(basicSongPresignedUrlResponse);
    }

    @PostMapping("/studios/{studioId}/basic")
    public ResponseEntity<BasicSongRegisterResponseDto> registerBasicSong(
            @PathVariable("studioId") String studioId,
            @CookieValue(name = "userId") Integer userId,
            @RequestBody BasicSongRegisterRequestDto requestDto) {
        BasicSongRegisterResponseDto basicSongRegisterResponse = songService.registerBasicSong(userId, Integer.parseInt(studioId), requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(basicSongRegisterResponse);
    }
}

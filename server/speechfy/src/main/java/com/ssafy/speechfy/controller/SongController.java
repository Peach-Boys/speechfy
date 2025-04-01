package com.ssafy.speechfy.controller;

import com.ssafy.speechfy.dto.song.basicSongPresignedUrlResponseDto;
import com.ssafy.speechfy.dto.song.imageCreateDto;
import com.ssafy.speechfy.dto.song.songListResponseDto;
import com.ssafy.speechfy.dto.song.songResponseDto;
import com.ssafy.speechfy.service.MusicGenService;
import com.ssafy.speechfy.service.S3Service;
import com.ssafy.speechfy.service.SongService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/song")
public class SongController {
    private final SongService songService;
    private final S3Service s3Service;
    private final MusicGenService musicGenService;

    public SongController(SongService songService, S3Service s3Service, MusicGenService musicGenService) {
        this.songService = songService;
        this.s3Service = s3Service;
        this.musicGenService = musicGenService;
    }

    // 마이페이지 완성곡 리스트 반환
    @GetMapping("/{userId}")
    public ResponseEntity<songListResponseDto> getSongList(@PathVariable Integer userId) {
        Pageable pageable = PageRequest.of(0, 3);
        songListResponseDto songListResponseDto = songService.getAllSongs(userId, pageable);

        return ResponseEntity.ok(songListResponseDto);
    }

    // 완성곡 변환 저장
    @PostMapping("/{studioId}")
    public ResponseEntity<?> createSongList(@PathVariable Integer studioId) {

        return ResponseEntity.ok(null);
    }

    // 완성곡 다운로드
    @GetMapping("/download/{songId}")
    public ResponseEntity<songResponseDto> getSong(@PathVariable Integer songId) {
        songResponseDto dto = songService.getSongById(songId);
        return ResponseEntity.ok(dto);
    }

    // 완성곡 삭제
    @DeleteMapping("/download/{songId}")
    public ResponseEntity<String> deleteSong(@PathVariable Integer songId) {
        songService.deleteSongById(songId);
        return ResponseEntity.noContent().build();
    }

    // 앨범 커버 생성
    @GetMapping("/cover/{studioId}")
    public ResponseEntity<?> createCover(@PathVariable Integer studioId, @RequestBody imageCreateDto createDto) {
        return ResponseEntity.ok(null);
    }

    // basicSong 저장
    // presignedUrl 생성 및 반환
    // Security 적용 전까지 일단 기존 방식으로 유저 인증
    @GetMapping("/basic/presignedUrl")
    public ResponseEntity<basicSongPresignedUrlResponseDto> getPresignedUrl(@CookieValue(name = "userId") Integer userId) {
        basicSongPresignedUrlResponseDto basicSongPresignedUrlResponse = songService.generateBasicSongPresignedUrl(userId);
        return ResponseEntity.ok(basicSongPresignedUrlResponse);
    }
}

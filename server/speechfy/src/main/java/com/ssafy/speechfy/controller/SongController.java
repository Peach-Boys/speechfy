package com.ssafy.speechfy.controller;

import lombok.RequiredArgsConstructor;
import com.ssafy.speechfy.dto.song.*;
import com.ssafy.speechfy.service.SongService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.MalformedURLException;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/song")
public class SongController {
    private final SongService songService;

    // 마이페이지 완성곡 리스트 반환
    @GetMapping("/{userId}")
    public ResponseEntity<SongListResponseDto> getSongList(@PathVariable Integer userId) {
        Pageable pageable = PageRequest.of(0, 3);
        SongListResponseDto songListResponseDto = songService.getAllSongs(userId, pageable);

        return ResponseEntity.ok(songListResponseDto);
    }

    // 완성곡 변환 저장
    @PostMapping("/{studioId}")
    public ResponseEntity<?> createSongList(@PathVariable Integer studioId) {

        return ResponseEntity.ok(null);
    }

    // 완성곡 다운로드 (사용하는 곳은 아직 없다고함)
    @GetMapping("/download/{songId}")
    public ResponseEntity<SongResponseDto> getSong(@PathVariable Integer songId) {
        SongResponseDto dto = songService.getSongById(songId);
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
    public ResponseEntity<?> createCover(@PathVariable Integer studioId, @RequestBody ImageCreateDto createDto) {
        return ResponseEntity.ok(null);
    }

    // basicSong 저장할 presignedUrl 생성 및 반환
    @GetMapping("/basic/presignedUrl")
    public ResponseEntity<BasicSongPresignedUrlResponseDto> getBasicSongPresignedUrl(@CookieValue(name = "userId") Integer userId) {
        BasicSongPresignedUrlResponseDto basicSongPresignedUrlResponse = songService.generateBasicSongPresignedUrl(userId);
        return ResponseEntity.ok(basicSongPresignedUrlResponse);
    }

    // aiSong 저장할 presignedUrl 생성 및 반환
    @GetMapping("/ai/presignedUrl")
    public ResponseEntity<AISongPresignedUrlResponseDto> getAISongPresignedUrl(@CookieValue(name = "userId") Integer userId) {
        AISongPresignedUrlResponseDto aiSongPresignedUrlResponse = songService.generateAISongPresignedUrl(userId);
        return ResponseEntity.ok(aiSongPresignedUrlResponse);
    }

    // S3에 저장한 곡을 DB에도 저장
    @PostMapping("/studios/{studioId}/basic/save")
    public ResponseEntity<BasicSongRegisterResponseDto> registerBasicSong(
            @PathVariable("studioId") String studioId,
            @CookieValue(name = "userId") Integer userId,
            @RequestBody BasicSongRegisterRequestDto requestDto) {
        BasicSongRegisterResponseDto basicSongRegisterResponse = songService.registerBasicSong(userId, Integer.parseInt(studioId), requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(basicSongRegisterResponse);
    }

    // S3에 저장한 곡을 DB에도 저장
    @PostMapping("/studios/{studioId}/ai/save")
    public ResponseEntity<AISongRegisterResponseDto> registerAISong(
            @PathVariable("studioId") String studioId,
            @CookieValue(name = "userId") Integer userId,
            @RequestBody AISongRegisterRequestDto requestDto) {
        AISongRegisterResponseDto aiSongRegisterResponse = songService.registerAISong(userId, Integer.parseInt(studioId), requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(aiSongRegisterResponse);
    }

    @PostMapping("/studios/{studioId}/ai")
    public ResponseEntity<String> composeSong(@RequestBody AISongCreateDto createDto,
                                              @CookieValue(name = "userId") Integer userId) {
        try {
            songService.requestSongComposition(userId, createDto.getBasicSongId());
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }

        // requestSongComposition() 안에서 아무리 시간이 오래 걸리는 작업이 있어도
        // 그 작업을 새 쓰레드(비동기)로 넘기기만 하면
        // 메인 쓰레드는 즉시 다음 줄(return ResponseEntity)을 실행
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body("변환 요청이 접수되었습니다.");
    }
}

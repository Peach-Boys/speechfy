package com.ssafy.speechfy.controller;

import com.ssafy.speechfy.dto.song.*;
import com.ssafy.speechfy.dto.work.track.TrackListRequestDto;
import com.ssafy.speechfy.oauth.SecurityUtil;
import com.ssafy.speechfy.service.MusicGenService;
import com.ssafy.speechfy.service.S3Service;
import com.ssafy.speechfy.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/song")
public class SongController {
    private final SongService songService;
    private final S3Service s3Service;
    private final MusicGenService musicGenService;

    private Integer getCurrentUserId() {
        return SecurityUtil.getCurrentUserId();
    }

    // 마이페이지 완성곡 리스트 반환
    @GetMapping("")
    public ResponseEntity<SongListResponseDto> getSongList() {
        Integer userId = getCurrentUserId();
        Pageable pageable = PageRequest.of(0, 3);
        SongListResponseDto songListResponseDto = songService.getAllSongs();

        return ResponseEntity.ok(songListResponseDto);
    }

    // 스튜디오의 모든 완성곡 리스트 반환
    @GetMapping("/{studioId}")
    public ResponseEntity<SongListResponseDto> getStudioSongList(@PathVariable Integer studioId) {
        Integer userId = getCurrentUserId();
        Pageable pageable = PageRequest.of(0, 3);
        SongListResponseDto songListResponseDto = songService.getStudioSongs(studioId);

        return ResponseEntity.ok(songListResponseDto);
    }

    // 스튜디오의 모든 완성곡 리스트 반환
    @GetMapping("/ai/{studioId}")
    public ResponseEntity<SongListResponseDto> getStudioAISongList(@PathVariable Integer studioId) {
        Integer userId = getCurrentUserId();
        Pageable pageable = PageRequest.of(0, 3);
        SongListResponseDto songListResponseDto = songService.getStudioAISongs(studioId);

        return ResponseEntity.ok(songListResponseDto);
    }

    // 완성곡 변환 저장
    @PostMapping("/{studioId}")
    public ResponseEntity<?> createSongList(@PathVariable Integer studioId, @RequestBody SongRequestDto songRequestDto) {
        songService.saveSong(songRequestDto, studioId);
        return ResponseEntity.ok(null);
    }

    // 완성곡 다운로드 (사용하는 곳은 아직 없음. 일단 만들어둠)
    @GetMapping("/download/{songId}")
    public ResponseEntity<SongResponseDto> getSong(@PathVariable Integer songId) {
        Integer userId = getCurrentUserId();
        SongResponseDto dto = songService.getSongById(songId);
        return ResponseEntity.ok(dto);
    }

    // 완성곡 삭제
    @DeleteMapping("/{songId}")
    public ResponseEntity<String> deleteSong(@PathVariable Integer songId) {
        Integer userId = getCurrentUserId();
        songService.deleteSongById(songId, userId);
        return ResponseEntity.noContent().build();
    }

    // 앨범 커버 생성
    @PostMapping("/cover")
    public ResponseEntity<?> createCover(@RequestBody ImageCreateDto createDto) {
        ImageResponseDto dto = songService.createCover(createDto);
        return ResponseEntity.ok(dto);
    }

    // basicSong 저장
    // presignedUrl 생성 및 반환
    @GetMapping("/basic/presignedUrl")
    public ResponseEntity<BasicSongPresignedUrlResponseDto> getPresignedUrl() {
        Integer userId = getCurrentUserId();
        BasicSongPresignedUrlResponseDto basicSongPresignedUrlResponse = songService.generateBasicSongPresignedUrl(userId);
        return ResponseEntity.ok(basicSongPresignedUrlResponse);
    }

    @PostMapping("/studios/{studioId}/basic/save")
    public ResponseEntity<BasicSongRegisterResponseDto> registerBasicSong(
            @PathVariable("studioId") String studioId,
            @RequestBody BasicSongRegisterRequestDto requestDto) {
        Integer userId = getCurrentUserId();
        BasicSongRegisterResponseDto basicSongRegisterResponse = songService.registerBasicSong(userId, Integer.parseInt(studioId), requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(basicSongRegisterResponse);
    }

    @GetMapping("/share/{songId}")
    public ResponseEntity<SongShareResponseDto> getShareSong(@PathVariable Integer songId) {
        System.out.println("안녕하세요");
        SongShareResponseDto songShareResponseDto = songService.getSongShareById(songId);
        return ResponseEntity.ok(songShareResponseDto);
    }
}

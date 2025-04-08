package com.ssafy.speechfy.controller;

import com.ssafy.speechfy.oauth.SecurityUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import com.ssafy.speechfy.dto.song.*;
import com.ssafy.speechfy.dto.work.track.TrackListRequestDto;
import com.ssafy.speechfy.oauth.SecurityUtil;
import com.ssafy.speechfy.service.S3Service;
import com.ssafy.speechfy.service.SongService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.MalformedURLException;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/song")
public class SongController {
    private final SongService songService;

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
    public ResponseEntity<List<AISongRegisterResponseDto>> getStudioAISongList(@PathVariable Integer studioId) {
        Integer userId = getCurrentUserId();
        Pageable pageable = PageRequest.of(0, 3);
        List<AISongRegisterResponseDto> songListResponseDto = songService.getStudioAISongs(studioId);

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

    // basicSong 저장할 presignedUrl 생성 및 반환
    @GetMapping("/basic/presignedUrl")
    public ResponseEntity<BasicSongPresignedUrlResponseDto> getBasicSongPresignedUrl() {
        Integer userId = getCurrentUserId();
        BasicSongPresignedUrlResponseDto basicSongPresignedUrlResponse = songService.generateBasicSongPresignedUrl(userId);
        return ResponseEntity.ok(basicSongPresignedUrlResponse);
    }

    // aiSong 저장할 presignedUrl 생성 및 반환
    @GetMapping("/ai/presignedUrl")
    public ResponseEntity<AISongPresignedUrlResponseDto> getAISongPresignedUrl() {
        Integer userId = getCurrentUserId();
        AISongPresignedUrlResponseDto aiSongPresignedUrlResponse = songService.generateAISongPresignedUrl(userId);
        return ResponseEntity.ok(aiSongPresignedUrlResponse);
    }

    // S3에 저장한 곡을 DB에도 저장
    @PostMapping("/studios/{studioId}/basic/save")
    public ResponseEntity<BasicSongRegisterResponseDto> registerBasicSong(
            @PathVariable("studioId") String studioId,
            @RequestBody BasicSongRegisterRequestDto requestDto) {
        Integer userId = getCurrentUserId();
        BasicSongRegisterResponseDto basicSongRegisterResponse = songService.registerBasicSong(userId, Integer.parseInt(studioId), requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(basicSongRegisterResponse);
    }

    // S3에 저장한 곡을 DB에도 저장
    @PostMapping("/studios/{studioId}/ai/save")
    public ResponseEntity<AISongRegisterResponseDto> registerAISong(
            @PathVariable("studioId") String studioId,
            @RequestBody AISongRegisterRequestDto requestDto) {
        Integer userId = getCurrentUserId();
        AISongRegisterResponseDto aiSongRegisterResponse = songService.registerAISong(userId, Integer.parseInt(studioId), requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(aiSongRegisterResponse);
    }

    @PostMapping("/studios/{studioId}/ai")
    public ResponseEntity<String> composeSong(@RequestBody AISongCreateDto createDto,
                                              @PathVariable int studioId,
                                              HttpServletRequest request) {
        // Content-Type 로그 출력
        String contentType = request.getContentType();
        log.info("요청 Content-Type: {}", contentType);

        try {
            Integer userId = getCurrentUserId();
            log.info("사용자 ID: {}, 스튜디오 ID: {}, 요청된 기본곡 ID: {}", userId, studioId, createDto.getBasicSongId());
            songService.requestSongComposition(userId, createDto.getBasicSongId());
        } catch (MalformedURLException e) {
            log.error("잘못된 URL 오류", e);
            throw new RuntimeException(e);
        }

        // requestSongComposition() 안에서 아무리 시간이 오래 걸리는 작업이 있어도
        // 그 작업을 새 쓰레드(비동기)로 넘기기만 하면
        // 메인 쓰레드는 즉시 다음 줄(return ResponseEntity)을 실행
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body("변환 요청이 접수되었습니다.");
    }


    @GetMapping("/share/{songId}")
    public ResponseEntity<SongShareResponseDto> getShareSong(@PathVariable Integer songId) {
        System.out.println("안녕하세요");
        SongShareResponseDto songShareResponseDto = songService.getSongShareById(songId);
        return ResponseEntity.ok(songShareResponseDto);
    }
}

package com.ssafy.speechfy.controller;

import com.ssafy.speechfy.dto.work.track.*;
import com.ssafy.speechfy.dto.work.studio.StudioCreateDto;
import com.ssafy.speechfy.dto.work.studio.StudioListResponseDto;
import com.ssafy.speechfy.dto.work.studio.StudioResponseDto;
import com.ssafy.speechfy.entity.CustomOAuth2User;
import com.ssafy.speechfy.oauth.SecurityUtil;
import com.ssafy.speechfy.service.S3Service;
import com.ssafy.speechfy.service.WorkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/work")
public class WorkController {
    private final WorkService workService;
    private final S3Service s3Service;

    private Integer getCurrentUserId() {
        return SecurityUtil.getCurrentUserId();
    }

    // API : 작업실 리스트 조회
    @GetMapping("/studio")
    public ResponseEntity<StudioListResponseDto> getStudioList() {
        Integer userId = getCurrentUserId();
        StudioListResponseDto responseDto = workService.getStudioList(userId);
        return ResponseEntity.ok(responseDto);
    }

    //API: 작업실 생성
    @PostMapping("/studio")
    public ResponseEntity<StudioResponseDto> createStudio(@RequestBody StudioCreateDto studioCreateDto) {
        Integer userId = getCurrentUserId();
        StudioResponseDto responseDto = workService.createStudio(userId, studioCreateDto);
        return ResponseEntity.ok(responseDto);
    }

    // API: 작업실 삭제
    @DeleteMapping("/studio/{studioId}")
    public ResponseEntity<String> deleteStudio(@PathVariable Integer studioId){
        Integer userId = getCurrentUserId();
        workService.deleteStudio(userId, studioId);
        return ResponseEntity.noContent().build();
    }

    //API: 작업실 트랙 리스트 반환 (작업실 입장시 트랙반환 위한 것)
    @GetMapping("/studio/{studioId}")
    public ResponseEntity<StudioResponseDto> getStudio(@PathVariable Integer studioId){
        Integer userId = getCurrentUserId();
        TrackListResponseDto trackListResponseDto = workService.getStudio(studioId);

        return ResponseEntity.ok(new StudioResponseDto(trackListResponseDto));
    }

    //API: 작업실 트랙 리스트 수정 (작업실 내 트랙 순서 수정시 한번에 넘겨주는 용도)
    @PutMapping("/studio/{studioId}")
    public ResponseEntity<String> updateTrackList(
            @PathVariable Integer studioId ,@RequestBody TrackListUpdateDto trackListUpdateDto){
        workService.updateTrackList(studioId,trackListUpdateDto);
        return ResponseEntity.ok(null);
    }

    //API: 작업실 트랙 초기화
    @DeleteMapping("/studio/{studioId}/reset")
    public ResponseEntity<String> deleteTrackList(@PathVariable Integer studioId){
        Integer userId = getCurrentUserId();
        workService.deleteTrackList(userId, studioId);
        return ResponseEntity.noContent().build();
    }

    /*
        API: 변환된 파일 업로드
        다만 저장 반환 로직 변화로 완전히 변형시켜야함
     */
    @PostMapping("/track/{studioId}")
    public ResponseEntity<TrackResponseDto> createTrack(
            @PathVariable Integer studioId,
            @RequestBody TrackCreateDto workCreateDto ){
        Integer userId = getCurrentUserId();
        TrackResponseDto responseDto = workService.createTrack(userId,studioId, workCreateDto);

        return ResponseEntity.ok(responseDto);
    }

    //API : 작업실 트랙 조회, 안쓰일 확률이 높거나 용도가 변경될 가능성이 높음
    @GetMapping("/track/{trackId}")
    public ResponseEntity<TrackResponseDto> getTrack(@PathVariable Integer trackId){
        TrackResponseDto responseDto = workService.getTrackResponseDto(trackId);
        return ResponseEntity.ok(responseDto);
    }

    //API: 트랙 삭제
    @DeleteMapping("/track/{trackId}")
    public ResponseEntity<String> deleteTrack(@PathVariable Integer trackId){
        workService.deleteTrack(trackId);
        return ResponseEntity.noContent().build();
    }

    //API : 트랙 수정
    @PutMapping("/track/{studioId}/{trackId}")
    public ResponseEntity<String> updateTrack(
            @PathVariable Integer studioId,@PathVariable Integer trackId,@RequestBody TrackUpdateDto trackUpdateDto ){
        workService.updateTrack(trackId,studioId, trackUpdateDto);
        return ResponseEntity.ok(null);
    }

    // API 녹음본 반환
    @GetMapping("/record/{recordId}")
    public ResponseEntity<RecordDto> getRecord(@PathVariable Integer recordId){
        RecordDto responseDto = workService.getRecordDto(recordId);
       return ResponseEntity.ok(responseDto);
    }
}


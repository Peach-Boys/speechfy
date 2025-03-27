package com.ssafy.speechfy.controller;

import com.ssafy.speechfy.dto.work.track.*;
import com.ssafy.speechfy.dto.work.studio.studioCreateDto;
import com.ssafy.speechfy.dto.work.studio.studioListResponseDto;
import com.ssafy.speechfy.dto.work.studio.studioResponseDto;
import com.ssafy.speechfy.repository.StudioRepository;
import com.ssafy.speechfy.service.S3Service;
import com.ssafy.speechfy.service.WorkService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/work")
public class WorkController {
    private final WorkService workService;
    private final StudioRepository studioRepository;
    private final S3Service s3Service;

    public WorkController(WorkService workService, StudioRepository studioRepository, S3Service s3Service) {
        this.workService = workService;
        this.studioRepository = studioRepository;
        this.s3Service = s3Service;
    }

    @GetMapping("/studio")
    public ResponseEntity<studioListResponseDto> getStudioList(@CookieValue(name = "userId") Integer userId) {
        studioListResponseDto responseDto = workService.getStudioList(userId);
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/studio")
    public ResponseEntity<String> createStudio(@CookieValue(name = "userId") Integer userId, @RequestBody studioCreateDto studioCreateDto) {
        workService.createStudio(userId, studioCreateDto);
        return ResponseEntity.created(null).body("Studio created"); // 이거 어캐함 ?
    }

    @DeleteMapping("/studio/{studioId}")
    public ResponseEntity<String> deleteStudio(@CookieValue(name = "userId") Integer userId, @PathVariable Integer studioId){
        workService.deleteStudio(userId, studioId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/studio/{studioId}")
    public ResponseEntity<studioResponseDto> getTrackList(@PathVariable Integer studioId){
        trackListResponseDto trackListResponseDto = workService.getTrackList(studioId);

        return ResponseEntity.ok(new studioResponseDto(trackListResponseDto));
    }

    @PutMapping("/studio/{studioId}")
    public ResponseEntity<String> updateTrackList(
            @PathVariable Integer studioId ,@RequestBody trackListUpdateDto trackListUpdateDto){
        workService.updateWorkList(studioId,trackListUpdateDto);
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/studio/{studioId}/reset")
    public ResponseEntity<String> deleteTrackList(@CookieValue(name = "userId") Integer userId, @PathVariable Integer studioId){
        workService.deleteTrackList(userId, studioId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/track/{studioId}")
    public ResponseEntity<trackResponseDto> createTrack(
            @CookieValue(name = "userId") Integer userId,
            @PathVariable Integer studioId,
            @RequestBody trackCreateDto workCreateDto ){

        trackResponseDto responseDto = workService.createTrack(userId,studioId, workCreateDto);

        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/track/{trackId}")
    public ResponseEntity<trackResponseDto> getTrack(@PathVariable Integer trackId){
        trackResponseDto responseDto = workService.getTrackResponseDto(trackId);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/track/{trackId}")
    public ResponseEntity<String> deleteTrack(@PathVariable Integer trackId){
        workService.deleteTrack(trackId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/track/{studioId}/{trackId}")
    public ResponseEntity<String> updateTrack(
            @PathVariable Integer studioId,@PathVariable Integer trackId,@RequestBody trackUpdateDto trackUpdateDto ){
        workService.updateTrack(trackId,studioId, trackUpdateDto);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/record/{recordId}")
    public ResponseEntity<recordDto> getRecord(@PathVariable Integer recordId){
        recordDto responseDto = workService.getRecordDto(recordId);
       return ResponseEntity.ok(responseDto);
    }
}


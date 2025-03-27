package com.ssafy.speechfy.controller;

import com.ssafy.speechfy.dto.work.track.*;
import com.ssafy.speechfy.dto.work.studio.StudioCreateDto;
import com.ssafy.speechfy.dto.work.studio.StudioListResponseDto;
import com.ssafy.speechfy.dto.work.studio.StudioResponseDto;
import com.ssafy.speechfy.service.S3Service;
import com.ssafy.speechfy.service.WorkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/work")
public class WorkController {
    private final WorkService workService;
    private final S3Service s3Service;


    @GetMapping("/studio")
    public ResponseEntity<StudioListResponseDto> getStudioList(@CookieValue(name = "userId") Integer userId) {
        StudioListResponseDto responseDto = workService.getStudioList(userId);
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/studio")
    public ResponseEntity<StudioResponseDto> createStudio(@CookieValue(name = "userId") Integer userId, @RequestBody StudioCreateDto studioCreateDto) {
        StudioResponseDto responseDto = workService.createStudio(userId, studioCreateDto);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/studio/{studioId}")
    public ResponseEntity<String> deleteStudio(@CookieValue(name = "userId") Integer userId, @PathVariable Integer studioId){
        workService.deleteStudio(userId, studioId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/studio/{studioId}")
    public ResponseEntity<StudioResponseDto> getStudio(@PathVariable Integer studioId){
        TrackListResponseDto trackListResponseDto = workService.getStudio(studioId);

        return ResponseEntity.ok(new StudioResponseDto(trackListResponseDto));
    }

    @PutMapping("/studio/{studioId}")
    public ResponseEntity<String> updateTrackList(
            @PathVariable Integer studioId ,@RequestBody TrackListUpdateDto trackListUpdateDto){
        workService.updateTrackList(studioId,trackListUpdateDto);
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/studio/{studioId}/reset")
    public ResponseEntity<String> deleteTrackList(@CookieValue(name = "userId") Integer userId, @PathVariable Integer studioId){
        workService.deleteTrackList(userId, studioId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/track/{studioId}")
    public ResponseEntity<TrackResponseDto> createTrack(
            @CookieValue(name = "userId") Integer userId,
            @PathVariable Integer studioId,
            @RequestBody TrackCreateDto workCreateDto ){

        TrackResponseDto responseDto = workService.createTrack(userId,studioId, workCreateDto);

        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/track/{trackId}")
    public ResponseEntity<TrackResponseDto> getTrack(@PathVariable Integer trackId){
        TrackResponseDto responseDto = workService.getTrackResponseDto(trackId);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/track/{trackId}")
    public ResponseEntity<String> deleteTrack(@PathVariable Integer trackId){
        workService.deleteTrack(trackId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/track/{studioId}/{trackId}")
    public ResponseEntity<String> updateTrack(
            @PathVariable Integer studioId,@PathVariable Integer trackId,@RequestBody TrackUpdateDto trackUpdateDto ){
        workService.updateTrack(trackId,studioId, trackUpdateDto);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/record/{recordId}")
    public ResponseEntity<RecordDto> getRecord(@PathVariable Integer recordId){
        RecordDto responseDto = workService.getRecordDto(recordId);
       return ResponseEntity.ok(responseDto);
    }
}


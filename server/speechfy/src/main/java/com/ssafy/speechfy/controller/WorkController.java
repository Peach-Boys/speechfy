package com.ssafy.speechfy.controller;

import com.ssafy.speechfy.dto.work.record.recordResponseDto;
import com.ssafy.speechfy.dto.work.studio.studioCreateDto;
import com.ssafy.speechfy.dto.work.studio.studioListResponseDto;
import com.ssafy.speechfy.dto.work.studio.studioResponseDto;
import com.ssafy.speechfy.dto.work.track.trackResponseDto;
import com.ssafy.speechfy.dto.work.track.trackUpdateDto;
import com.ssafy.speechfy.dto.work.work.workCreateDto;
import com.ssafy.speechfy.dto.work.work.workListResponseDto;
import com.ssafy.speechfy.dto.work.work.workListUpdateDto;
import com.ssafy.speechfy.dto.work.work.workResponseDto;
import com.ssafy.speechfy.entity.Studio;
import com.ssafy.speechfy.repository.StudioRepository;
import com.ssafy.speechfy.service.S3Service;
import com.ssafy.speechfy.service.WorkService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


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
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/studio/{studioId}")
    public ResponseEntity<String> deleteStudio(@CookieValue(name = "userId") Integer userId, @PathVariable Integer studioId){
        workService.deleteStudio(userId, studioId);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/studio/{studioId}")
    public ResponseEntity<studioResponseDto> getWorkList(@PathVariable Integer studioId){
        workListResponseDto workListResponseDto = workService.getWorkList(studioId);
        Optional<Studio> optionalStudio = studioRepository.findById(studioId);
        Studio studio = workService.checkElementException(optionalStudio, "Studio not found");
        return ResponseEntity.ok(new studioResponseDto(
                studioId,
                studio.getName(),
                workListResponseDto
        ));
    }

    @PatchMapping("/studio/{studioId}")
    public ResponseEntity<String> updateWorkList(
            @PathVariable Integer studioId ,@RequestBody workListUpdateDto workListUpdateDto){
        workService.updateWorkList(studioId,workListUpdateDto);
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/studio/{studioId}/reset")
    public ResponseEntity<String> deleteWorkList( @CookieValue(name = "userId") Integer userId, @PathVariable Integer studioId){
        workService.deleteWorkList(userId, studioId);
        return ResponseEntity.ok(null);
    }

    @PostMapping("/track/{studioId}")
    public ResponseEntity<workResponseDto> createWork(
            @CookieValue(name = "userId") Integer userId,
            @PathVariable Integer studioId,
            @RequestBody workCreateDto workCreateDto ){

        workResponseDto responseDto = workService.createWork(userId,studioId, workCreateDto);

        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/track/{trackId}")
    public ResponseEntity<trackResponseDto> getTrack(@PathVariable Integer trackId){
        trackResponseDto responseDto = workService.getTrackResponseDto(trackId);
        return ResponseEntity.ok(responseDto);
    }
    @PatchMapping("/track/{studioId}/{trackId}")
    public ResponseEntity<String> updateTrack(
            @PathVariable Integer studioId,@PathVariable Integer trackId,@RequestBody trackUpdateDto trackUpdateDto ){
        workService.updateTrack(trackId,studioId, trackUpdateDto);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/record/{recordId}")
    public ResponseEntity<recordResponseDto> getRecord(@PathVariable Integer recordId){
        recordResponseDto responseDto = workService.getRecordResponseDto(recordId);
       return ResponseEntity.ok(responseDto);
    }
}


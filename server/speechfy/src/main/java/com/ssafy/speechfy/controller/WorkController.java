package com.ssafy.speechfy.controller;

import com.ssafy.speechfy.dto.work.*;

import com.ssafy.speechfy.service.S3Service;
import com.ssafy.speechfy.service.WorkService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/work")
public class WorkController {
    private final WorkService workService;
    private final S3Service s3Service;

    public WorkController(WorkService workService, S3Service s3Service) {
        this.workService = workService;
        this.s3Service = s3Service;
    }

    @GetMapping("/studio")
    public ResponseEntity<workListResponseDto> getStudioList(@CookieValue(name = "userId") Integer userId) {
        workListResponseDto responseDto = workService.getStudioList();
        return ResponseEntity.ok(null);
    }

    @PostMapping("/studio")
    public ResponseEntity<String> createStudio(@CookieValue(name = "userId") Integer userId){

        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/studio/{studioId}")
    public ResponseEntity<String> deleteStudio(@PathVariable Integer studioId){

        return ResponseEntity.ok(null);
    }

    @GetMapping("/studio/{studioId}")
    public ResponseEntity<workListResponseDto> getWorkList(@PathVariable Integer studioId){

        return ResponseEntity.ok(null);
    }

    @PatchMapping("/studio/{studioId}")
    public ResponseEntity<String> updateWorkList(
            @PathVariable Integer studioId ,@RequestBody workListUpdateDto workListUpdateDto){
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/studio/{studioId}")
    public ResponseEntity<String> deleteWorkList(){

        return ResponseEntity.ok(null);
    }

    @PostMapping("/track")
    public ResponseEntity<workResponseDto> createWork(@CookieValue(name = "userId") Integer userId, @RequestBody workCreateDto workCreateDto ){

       return ResponseEntity.ok(null);
    }

    @GetMapping("/track/{trackId}")
    public ResponseEntity<trackResponseDto> getTrack(@CookieValue(name = "userId") Integer userId, @PathVariable Integer trackId){

        return ResponseEntity.ok(null);
    }
    @PatchMapping("/track/{trackId}")
    public ResponseEntity<String> updateTrack( @CookieValue(name = "userId") Integer userId,
            @PathVariable Integer trackId, @RequestBody trackUpdateDto trackUpdateDto ){
        return ResponseEntity.ok(null);
    }

    @GetMapping("/record/{trackId}")
    public ResponseEntity<recordResponseDto> getRecord(@PathVariable Integer trackId){
        recordResponseDto responseDto = workService.getRecord(trackId);
       return ResponseEntity.ok(responseDto);
    }
}


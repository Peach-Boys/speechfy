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
    public ResponseEntity<workListResponseDto> getStudioList(){
        return null;
    }

    @PostMapping("/studio")
    public ResponseEntity<String> createStudio(){
        return null;
    }

    @DeleteMapping("/studio/{studioId}")
    public ResponseEntity<String> deleteStudio(@PathVariable Integer studioId){
        return null;
    }

    @GetMapping("/studio/{studioId}")
    public ResponseEntity<workListResponseDto> getWorkList(@PathVariable Integer studioId){
        return null;
    }

    @PatchMapping("/studio/{studioId}")
    public ResponseEntity<String> updateWorkList(
            @PathVariable Integer studioId ,@RequestBody workListUpdateDto workListUpdateDto){
        return null;
    }

    @DeleteMapping("/studio/{studioId}")
    public ResponseEntity<String> deleteWorkList(){
        return null;
    }

    @PostMapping("/track")
    public ResponseEntity<workResponseDto> createWork(@RequestBody workCreateDto workCreateDto ){
        return null;
    }

    @GetMapping("/track/{trackId}")
    public ResponseEntity<trackResponseDto> getTrack(@PathVariable Integer trackId){
        return null;
    }
    @PatchMapping("/track/{trackId}")
    public ResponseEntity<String> updateTrack(
            @PathVariable Integer trackId, @RequestBody trackUpdateDto trackUpdateDto ){
        return null;
    }

    @GetMapping("/record/{trackId}")
    public ResponseEntity<recordResponseDto> getRecord(@PathVariable Integer trackId){
        return null;
    }
}


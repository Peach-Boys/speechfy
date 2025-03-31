package com.ssafy.speechfy.controller;

import com.ssafy.speechfy.dto.work.studio.StudioListResponseDto;
import com.ssafy.speechfy.dto.work.track.PresignedUrlDto;
import com.ssafy.speechfy.repository.RecordReposiotry;
import com.ssafy.speechfy.repository.SongRepository;
import com.ssafy.speechfy.repository.TrackRepository;
import com.ssafy.speechfy.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/S3")
public class S3Controller {

    private final S3Service s3Service;
    private final RecordReposiotry recordReposiotry;
    private final SongRepository songRepository;
    private final TrackRepository trackRepository;
    @GetMapping("/presignedUrl")
    public ResponseEntity<PresignedUrlDto> getUrl(@RequestParam(value = "category", required = false) String category) {
        String objectKey = "users/1/" + category;
        PresignedUrlDto responseDto = new PresignedUrlDto(
                s3Service.generatePresignedUrl(objectKey).toString()
        );
        return ResponseEntity.ok(responseDto);
    }

}

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
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/S3")
public class S3Controller {

    private final S3Service s3Service;
    private final RecordReposiotry recordReposiotry;
    private final SongRepository songRepository;
    private final TrackRepository trackRepository;
    @GetMapping("/track/{trackId}")
    public ResponseEntity<PresignedUrlDto> getTrackUrl(@PathVariable Long trackId) {
        String objectKey = "users/1/track" + trackId;
        PresignedUrlDto responseDto = new PresignedUrlDto(
                s3Service.generatePresignedUrl(objectKey).toString()
        );
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/song/{songId}")
    public ResponseEntity<PresignedUrlDto> getSongUrl(@PathVariable Long songId) {
        String objectKey = "users/1/track/1" + songId;
        PresignedUrlDto responseDto = new PresignedUrlDto(
                s3Service.generatePresignedUrl(objectKey).toString()
        );
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/record/{recordId}")
    public ResponseEntity<PresignedUrlDto> getRecordUrl(@PathVariable Long recordId) {
        String objectKey = "users/1" + recordId;
        PresignedUrlDto responseDto = new PresignedUrlDto(
                s3Service.generatePresignedUrl(objectKey).toString()
        );
        return ResponseEntity.ok(responseDto);
    }
}

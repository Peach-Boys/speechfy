package com.ssafy.speechfy.controller;

import com.ssafy.speechfy.dto.work.studio.StudioListResponseDto;
import com.ssafy.speechfy.dto.work.track.PresignedUrlDto;
import com.ssafy.speechfy.oauth.SecurityUtil;
import com.ssafy.speechfy.repository.RecordReposiotry;
import com.ssafy.speechfy.repository.SongRepository;
import com.ssafy.speechfy.repository.TrackRepository;
import com.ssafy.speechfy.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/S3")
public class S3Controller {

    private final S3Service s3Service;
    private final RecordReposiotry recordReposiotry;
    private final SongRepository songRepository;
    private final TrackRepository trackRepository;

    private Integer getCurrentUserId() {
        return SecurityUtil.getCurrentUserId();
    }

    @GetMapping("/presignedUrl/{studioId}")
    public ResponseEntity<PresignedUrlDto> getDDSPUrl(@PathVariable Integer studioId) {
        int userId = getCurrentUserId();
        String trackUUID =  UUID.randomUUID().toString();
        String recordUUID =  UUID.randomUUID().toString();

        String trackPath = "users/" + userId + "/track/" + trackUUID + ".wav";
        String recordPath = "users/" + userId + "/record/" + recordUUID + ".wav";
        PresignedUrlDto responseDto = new PresignedUrlDto(
                s3Service.generatePresignedUrl(trackPath).toString(),
                s3Service.generatePresignedUrl(recordPath).toString(),
                trackUUID,
                recordUUID
        );
        return ResponseEntity.ok(responseDto);
    }

}

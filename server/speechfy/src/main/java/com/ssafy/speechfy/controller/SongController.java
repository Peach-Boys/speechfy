package com.ssafy.speechfy.controller;

import com.ssafy.speechfy.dto.song.imageCreateDto;
import com.ssafy.speechfy.dto.song.songListResponseDto;
import com.ssafy.speechfy.service.MusicGenService;
import com.ssafy.speechfy.service.S3Service;
import com.ssafy.speechfy.service.SongService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/song")
public class SongController {
    private final SongService songService;
    private final S3Service s3Service;
    private final MusicGenService musicGenService;

    public SongController(SongService songService, S3Service s3Service, MusicGenService musicGenService) {
        this.songService = songService;
        this.s3Service = s3Service;
        this.musicGenService = musicGenService;
    }

    @GetMapping("/{studioId}")
    public ResponseEntity<songListResponseDto> getSongList(@PathVariable Integer studioId) {


        return ResponseEntity.ok(null);
    }

    @PostMapping("/{studioId}")
    public ResponseEntity<?> createSongList(@PathVariable Integer studioId) {

        return ResponseEntity.ok(null);
    }


    @DeleteMapping("/{studioId}")
    public ResponseEntity<?> deleteSongList(@PathVariable Integer studioId) {

        return ResponseEntity.ok(null);
    }

    @GetMapping("/download/{studioId}")
    public ResponseEntity<?> getSong(@PathVariable Integer studioId) {

        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/download/{studioId}")
    public ResponseEntity<?> deleteSong(@PathVariable Integer studioId) {

        return ResponseEntity.ok(null);
    }

    @GetMapping("cover/{studioId}")
    public ResponseEntity<?> createCover(@PathVariable Integer studioId, @RequestBody imageCreateDto createDto) {
        return ResponseEntity.ok(null);
    }




}

package com.ssafy.speechfy.service;

import com.ssafy.speechfy.dto.song.*;
import com.ssafy.speechfy.entity.Song;
import com.ssafy.speechfy.entity.User;
import com.ssafy.speechfy.repository.SongRepository;
import com.ssafy.speechfy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SongService {

    @Value("${openai.api.key}")
    private String apiKey;
    private final String OPENAI_URL = "https://api.openai.com/v1/images/generations";

    @Autowired
    private S3Service s3Service;

    private final SongRepository songRepository;
    private final UserRepository userRepository;

    /**
     * 마이페이지 완성곡 리스트 반환
     * songListResponseDto
     * 페이지네이션 기능 추가
     */
    public songListResponseDto getAllSongs(Integer userId, Pageable pageable) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        Page<Song> songList = songRepository.findPageByUser(user, pageable);

        List<songResponseDto> songResponseDtoList = songList.getContent().stream().map(song -> {
            songResponseDto dto = new songResponseDto();
            dto.setSongId(song.getId());
            dto.setUserId(userId);
            dto.setSongPresignedUrl(song.getFilePath());
            dto.setViewCount(song.getViewCount());
            dto.setLikesCount(song.getLikesCount());
            dto.setImagePresignedUrl(song.getImagePath());
            dto.setGenre(song.getGenreType().toString());
            dto.setMood(song.getMoodType().toString());

            return dto;
        }).collect(Collectors.toList());
        
        return new songListResponseDto(songResponseDtoList);
    }

    /**
     * id 기반 완성곡 반환
     *
     */
    public songResponseDto getSongById(int songId) {
        Song song = songRepository.findById(songId).orElseThrow(
                () -> new NoSuchElementException("Song not found")
        );
        songResponseDto dto = new songResponseDto();
        dto.setSongId(song.getId());
        dto.setUserId(song.getUser().getId());
        dto.setSongPresignedUrl(song.getFilePath());
        dto.setViewCount(song.getViewCount());
        dto.setLikesCount(song.getLikesCount());
        dto.setImagePresignedUrl(song.getImagePath());
        dto.setGenre(song.getGenreType().toString());
        dto.setMood(song.getMoodType().toString());

        return dto;
    }

    /**
     * 완성곡 생성
     */
    @Transactional
    public void createSong() {

    }

    /**
     * 완성곡 삭제
     */
    @Transactional
    public void deleteSongById(int songId) {
        songRepository.deleteById(songId);
    }

    /**
     * 앨범커버 생성
     */
    @Transactional
    public String createCover(imageCreateDto createDto) {
        String genre = createDto.getGenre();
        String mood = createDto.getMood();
        String title = createDto.getTitle();
        String prompt = "A stunning album cover for a " + genre + " music album, evoking a " + mood + " atmosphere. The title '" + title + "' is featured in a stylish font. The artwork is visually captivating, with a blend of cinematic lighting, rich colors, and artistic composition.";
        // 이미지 생성
        String imageUrl = generateImage(prompt);
        String objeckKey = "images/" + UUID.randomUUID();
        // 이미지 S3에 업로드
        s3Service.uploadImageFromUrl(imageUrl, objeckKey);
        return objeckKey;
    }

    public String generateImage(String prompt) {
        RestTemplate restTemplate = new RestTemplate();

        // 요청 생성
        OpenAIRequestDto request = new OpenAIRequestDto(prompt, 1, "1024x1024");

        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");

        HttpEntity<OpenAIRequestDto> entity = new HttpEntity<>(request, headers);

        // API 요청
        ResponseEntity<OpenAIResponseDto> response = restTemplate.exchange(
                OPENAI_URL, HttpMethod.POST, entity, OpenAIResponseDto.class);

        if (response.getBody() != null && !response.getBody().getData().isEmpty()) {
            return response.getBody().getData().get(0).getUrl();
        }
        return null;
    }
    /**
    * 완성곡 리스트 수정
    */
    @Transactional
    public void updateSong() {

    }

    /**
     * 완성곡 리스트 삭제
     */
    @Transactional
    public void deleteSong() {}

}

package com.ssafy.speechfy.service;

import com.ssafy.speechfy.dto.song.*;
import com.ssafy.speechfy.dto.work.track.TrackDto;
import com.ssafy.speechfy.dto.work.track.TrackListRequestDto;
import com.ssafy.speechfy.entity.Song;
import com.ssafy.speechfy.entity.Studio;
import com.ssafy.speechfy.entity.User;
import com.ssafy.speechfy.enums.GenreType;
import com.ssafy.speechfy.enums.InstrumentType;
import com.ssafy.speechfy.enums.MoodType;
import com.ssafy.speechfy.oauth.SecurityUtil;
import com.ssafy.speechfy.repository.SongRepository;
import com.ssafy.speechfy.repository.StudioRepository;
import com.ssafy.speechfy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.*;
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
    private final StudioRepository studioRepository;

    private Integer getCurrentUserId() {
        return SecurityUtil.getCurrentUserId();
    }

    /**
     * 마이페이지 완성곡 리스트 반환
     * songListResponseDto
     * 페이지네이션 기능 추가
     */
    public SongListResponseDto getAllSongs() {
        Integer userId = getCurrentUserId();
        Pageable pageable = PageRequest.of(0, 100);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        Page<Song> songList = songRepository.findPageByUser(user, pageable);

        List<SongResponseDto> songResponseDtoList = songList.getContent().stream().map(song -> {
            URL songCloudFrontUrl = checkMalformedUrlException(song.getFilePath());
            URL imageCloudFrontUrl = checkMalformedUrlException(song.getImagePath());


            return SongResponseDto.builder()
                    .songId(song.getId())
                    .title(song.getName())
                    .AIUsed(song.getIsAIUsed())
                    .userId(song.getUser().getId())
                    .songPresignedUrl(songCloudFrontUrl.toString())
                    .viewCount(song.getViewCount())
                    .likesCount(song.getLikesCount())
                    .imagePresignedUrl(imageCloudFrontUrl.toString())
                    .genre(song.getGenreType().toString())
                    .mood(song.getMoodType().toString())
                    .instruments(song.getInstruments()
                            .stream()
                            .map(Enum::toString)
                            .collect(Collectors.toList()))
                    .build();
        }).collect(Collectors.toList());

        return SongListResponseDto.builder()
                .songList(songResponseDtoList)
                .build();
    }

    // 스튜디오의 모든 곡 리스트 반환
    public SongListResponseDto getStudioSongs(Integer studioId) {
        Pageable pageable = PageRequest.of(0, 100);

//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new NoSuchElementException("User not found"));
//        Page<Song> songList = songRepository.findPageByUser(user, pageable);
        Studio studio = studioRepository.findById(studioId)
                .orElseThrow(() -> new EntityNotFoundException("Studio not found with id: " + studioId));

        Page<Song> songList = songRepository.findPageByStudio(studio, pageable);


        List<SongResponseDto> songResponseDtoList = songList.getContent().stream().map(song -> {
            URL songCloudFrontUrl = checkMalformedUrlException(song.getFilePath());
            URL imageCloudFrontUrl = checkMalformedUrlException(song.getImagePath());


            return SongResponseDto.builder()
                    .songId(song.getId())
                    .title(song.getName())
                    .AIUsed(song.getIsAIUsed())
                    .userId(song.getUser().getId())
                    .songPresignedUrl(songCloudFrontUrl.toString())
                    .viewCount(song.getViewCount())
                    .likesCount(song.getLikesCount())
                    .imagePresignedUrl(imageCloudFrontUrl.toString())
                    .genre(song.getGenreType().toString())
                    .mood(song.getMoodType().toString())
                    .instruments(song.getInstruments()
                            .stream()
                            .map(Enum::toString)
                            .collect(Collectors.toList()))
                    .build();
        }).collect(Collectors.toList());

        return SongListResponseDto.builder()
                .songList(songResponseDtoList)
                .build();
    }

    /**
     * id 기반 완성곡 반환
     */

    public SongResponseDto getSongById(int songId) {
        Song song = songRepository.findById(songId).orElseThrow(
                () -> new NoSuchElementException("Song not found")
        );

        URL songCloudFrontUrl = checkMalformedUrlException(song.getFilePath());
        URL imageCloudFrontUrl = checkMalformedUrlException(song.getImagePath());

        return SongResponseDto.builder()
                .songId(song.getId())
                .title(song.getName())
                .AIUsed(song.getIsAIUsed())
                .userId(song.getUser().getId())
                .songPresignedUrl(songCloudFrontUrl.toString())
                .viewCount(song.getViewCount())
                .likesCount(song.getLikesCount())
                .imagePresignedUrl(imageCloudFrontUrl.toString())
                .genre(song.getGenreType().toString())
                .mood(song.getMoodType().toString())
                .instruments(song.getInstruments()
                        .stream()
                        .map(Enum::toString)
                        .collect(Collectors.toList()))
                .build();
    }

    public SongShareResponseDto getSongShareById(int songId) {
        System.out.println("반가워요");
        Song song = songRepository.findById(songId).orElseThrow(
                () -> new NoSuchElementException("Song not found")
        );
        System.out.println("이게 뭐임");
        URL songCloudFrontUrl = checkMalformedUrlException(song.getFilePath());
        URL imageCloudFrontUrl = checkMalformedUrlException(song.getImagePath());

        return SongShareResponseDto.builder()
                .songName(song.getName())
                .imageCloudFrontUrl(imageCloudFrontUrl.toString())
                .songCloudFrontUrl(songCloudFrontUrl.toString())
                .build();
    }

    /**
     * 완성곡 생성
     */
    @Transactional
    public void saveSong(SongRequestDto songRequestDto, int studioId) {
        Integer userId = getCurrentUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        Studio studio = studioRepository.findById(studioId)
                .orElseThrow(() -> new NoSuchElementException("Studio not found"));
        // 수정 필요
        Song song = new Song();
        song.setName(songRequestDto.getTitle());
        Set<InstrumentType> instrumentTypes = new HashSet<>();
        for (TrackDto t : songRequestDto.getTrackList()) {
            instrumentTypes.add(InstrumentType.valueOf(t.getInstrumentName()));
        }
        song.setInstruments(instrumentTypes);
        song.setUser(user);
        song.setStudio(studio);
        song.setFilePath("songs/marg_singing_voice.wav");
        song.setGenreType(GenreType.valueOf(songRequestDto.getGerne()));
        song.setMoodType(MoodType.valueOf(songRequestDto.getMood()));
        songRepository.save(song);
    }

    /**
     * 완성곡 삭제
     */
    @Transactional
    public void deleteSongById(int songId, int userId) {
        Song song = songRepository.findById(songId).orElseThrow(
                () -> new NoSuchElementException("Song not found")
        );;
        if (song.getUser().getId() != userId) {
            return;
        }
        songRepository.deleteById(songId);
    }

    /**
     * 앨범커버 생성
     */
    @Transactional
    public ImageResponseDto createCover(ImageCreateDto createDto) {
        String genre = createDto.getGenre();
        String mood = createDto.getMood();
        String title = createDto.getTitle();
        String prompt = "A stunning album cover for a " + genre + " music album, evoking a " + mood + " atmosphere. The title '" + title + "' is featured in a stylish font. The artwork is visually captivating, with a blend of cinematic lighting, rich colors, and artistic composition.";
        // 이미지 생성
        String imageUrl = generateImage(prompt);
        String objectKey = "images/" + UUID.randomUUID();
        // 이미지 S3에 업로드
        s3Service.uploadImageFromUrl(imageUrl, objectKey);
        URL cloudFrontImageUrl;
        try {
            cloudFrontImageUrl = s3Service.getCloudFrontUrl(objectKey);
        } catch (Exception e) {
            cloudFrontImageUrl = null;
        }
        return new ImageResponseDto(cloudFrontImageUrl.toString());
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

    // 기본 곡 저장을 위한 presignedUrl 생성
    public BasicSongPresignedUrlResponseDto generateBasicSongPresignedUrl(int userId) {
        String basicSongFilePath = "users/" + userId + "/basicSong/" + UUID.randomUUID().toString() + ".wav";
        URL basicSongPresignedUrl = s3Service.generatePresignedUrl(basicSongFilePath);
        return BasicSongPresignedUrlResponseDto.builder()
                .basicSongPresignedUrl(basicSongPresignedUrl.toString())
                .basicSongFilePath(basicSongFilePath)
                .build();
    }

    @Transactional
    public BasicSongRegisterResponseDto registerBasicSong(int userId, int studioId, BasicSongRegisterRequestDto requestDto) {
        User user = userRepository.findById(userId)
                    .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
        Studio studio = studioRepository.findById(studioId)
                        .orElseThrow(() -> new EntityNotFoundException("Studio not found with id: " + studioId));

        Set<InstrumentType> instrumentTypes = new HashSet<>();
        for (String s : requestDto.getInstruments()) {
            instrumentTypes.add(InstrumentType.valueOf(s));
        }
        // imagePath만 null이고 나머지는 초기값이 존재함.
        Song basicSong = Song.builder()
                .user(user)
                .studio(studio)
                .moodType(MoodType.valueOf(requestDto.getMood()))
                .instruments(instrumentTypes)
                .genreType(GenreType.valueOf(requestDto.getGenre()))
                .viewCount(0)
                .likesCount(0)
                .name(requestDto.getTitle())
                .filePath(requestDto.getBasicSongFilePath())
                .isAIUsed(false)
                .build();

        Song savedSong = songRepository.save(basicSong);

        return BasicSongRegisterResponseDto.builder()
                .basicSongId(savedSong.getId())
                .userId(userId)
                .studioId(studioId)
                .viewCount(savedSong.getViewCount())
                .likesCount(savedSong.getLikesCount())
                .mood(savedSong.getMoodType().toString())
                .genre(savedSong.getGenreType().toString())
                .title(savedSong.getName())
                .AIUsed(savedSong.getIsAIUsed())
                .instruments(savedSong.getInstruments()
                        .stream()
                        .map(Enum::toString)
                        .collect(Collectors.toList()))
                .build();
    }

    public URL  checkMalformedUrlException(String filePath) {
        try {
            return s3Service.getCloudFrontUrl(filePath);
        } catch (MalformedURLException e) {
            throw new RuntimeException("잘못된 파일 경로입니다.");
        }
    }
}

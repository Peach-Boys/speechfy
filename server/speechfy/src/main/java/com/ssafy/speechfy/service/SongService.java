package com.ssafy.speechfy.service;
import com.ssafy.speechfy.dto.song.*;
import com.ssafy.speechfy.dto.work.track.TrackDto;
import com.ssafy.speechfy.dto.work.track.TrackListRequestDto;
import com.ssafy.speechfy.entity.Song;
import com.ssafy.speechfy.entity.Studio;
import com.ssafy.speechfy.entity.User;
import com.ssafy.speechfy.enums.GenreType;
import com.ssafy.speechfy.enums.MoodType;
import com.ssafy.speechfy.enums.InstrumentType;
import com.ssafy.speechfy.oauth.SecurityUtil;
import com.ssafy.speechfy.repository.SongRepository;
import com.ssafy.speechfy.repository.StudioRepository;
import com.ssafy.speechfy.repository.UserRepository;
import com.ssafy.speechfy.websocket.AIWebSocketHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.web.reactive.function.client.WebClient;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class SongService {

    @Value("${openai.api.key}")
    private String apiKey;
    private final String OPENAI_URL = "https://api.openai.com/v1/images/generations";

    private final SongRepository songRepository;
    private final UserRepository userRepository;
    private final StudioRepository studioRepository;
    private final S3Service s3Service;
    private final WebClient webClient;
    private final AIWebSocketHandler webSocketHandler;

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

    // 스튜디오내 모든 AI 송 반환
    public List<AISongRegisterResponseDto> getStudioAISongs(Integer studioId) {
        Pageable pageable = PageRequest.of(0, 100);

//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new NoSuchElementException("User not found"));
//        Page<Song> songList = songRepository.findPageByUser(user, pageable);
        Studio studio = studioRepository.findById(studioId)
                .orElseThrow(() -> new EntityNotFoundException("Studio not found with id: " + studioId));

        Page<Song> songList = songRepository.findPageByStudioAndIsAIUsedTrue(studio, pageable);

        List<AISongRegisterResponseDto> songResponseDtoList = songList.getContent().stream().map(song -> {
            URL songCloudFrontUrl = checkMalformedUrlException(song.getFilePath());

            return AISongRegisterResponseDto.builder()
                    .aiSongId(song.getId())
                    .name(song.getName())
                    .isAIUsed(song.getIsAIUsed())
                    .userId(song.getUser().getId())
                    .signedUrl(songCloudFrontUrl.toString())
                    .viewCount(song.getViewCount())
                    .likesCount(song.getLikesCount())
                    .genre(song.getGenreType())
                    .mood(song.getMoodType())
                    .instruments(song.getInstruments()
                            .stream()
                            .map(Enum::toString)
                            .collect(Collectors.toList()))
                    .build();
        }).collect(Collectors.toList());

        return songResponseDtoList;
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
        //String imageUrl = generateImage(prompt);
        //String objectKey = "images/" + UUID.randomUUID();
        // 이미지 S3에 업로드
        // s3Service.uploadImageFromUrl(imageUrl, objectKey);
        String objectKey = "images/album-cover.png";
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
    public void deleteSong() {

    }


    // 기본 곡 저장을 위한 presignedUrl 생성
    public BasicSongPresignedUrlResponseDto generateBasicSongPresignedUrl(int userId) {
        String basicSongFilePath = "users/" + userId + "/basicSong/" + UUID.randomUUID() + ".wav";
        URL basicSongPresignedUrl = s3Service.generatePresignedUrl(basicSongFilePath);
        return BasicSongPresignedUrlResponseDto.builder()
                .basicSongPresignedUrl(basicSongPresignedUrl.toString())
                .basicSongFilePath(basicSongFilePath)
                .build();
    }

    // AI 곡 저장을 위한 presignedUrl 생성
    public AISongPresignedUrlResponseDto generateAISongPresignedUrl(int userId) {
        String aiSongFilePath = "users/" + userId + "/aiSong/" + UUID.randomUUID() + ".wav";
        URL aiSongPresignedUrl = s3Service.generatePresignedUrl(aiSongFilePath);
        return AISongPresignedUrlResponseDto.builder()
                .aiSongPresignedUrl(aiSongPresignedUrl.toString())
                .aiSongFilePath(aiSongFilePath)
                .build();
    }

    // S3에 저장한 곡을 DB에도 저장
    @Transactional
    public BasicSongRegisterResponseDto registerBasicSong(int userId, int studioId, BasicSongRegisterRequestDto requestDto) {
        User user = userRepository.findById(userId)
                    .orElseThrow(() -> new NoSuchElementException("User not found with id: " + userId));
        Studio studio = studioRepository.findById(studioId)
                        .orElseThrow(() -> new NoSuchElementException("Studio not found with id: " + studioId));

        // imagePath만 null이고 나머지는 초기값이 존재함.
        Song basicSong = Song.builder()
                .user(user)
                .studio(studio)
                .moodType(requestDto.getMood())
                .genreType(requestDto.getGenre())
                .viewCount(0)
                .likesCount(0)
                .name(requestDto.getName())
                .filePath(requestDto.getBasicSongFilePath())
                .isAIUsed(false)
                .instruments(requestDto.getInstruments()
                        .stream()
                        .map(InstrumentType::valueOf)
                        .collect(Collectors.toSet()))
                .build();

        Song savedSong = songRepository.save(basicSong);

        return BasicSongRegisterResponseDto.builder()
                .basicSongId(savedSong.getId())
                .userId(userId)
                .studioId(studioId)
                .viewCount(savedSong.getViewCount())
                .likesCount(savedSong.getLikesCount())
                .mood(savedSong.getMoodType())
                .genre(savedSong.getGenreType())
                .name(savedSong.getName())
                .isAIUsed(savedSong.getIsAIUsed())
                .instruments(savedSong.getInstruments()
                        .stream()
                        .map(Enum::toString)
                        .collect(Collectors.toList()))
                .build();
    }

    // S3에 저장한 곡을 DB에도 저장
    @Transactional
    public AISongRegisterResponseDto registerAISong(int userId, int studioId, AISongRegisterRequestDto requestDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found with id: " + userId));
        Studio studio = studioRepository.findById(studioId)
                .orElseThrow(() -> new NoSuchElementException("Studio not found with id: " + studioId));

        Set<InstrumentType> instruments = Arrays.stream(requestDto.getInstrumentsString().split(", "))
                .map(String::trim)
                .map(String::toUpperCase)
                .filter(name -> {
                    try {
                        InstrumentType.valueOf(name);
                        return true;
                    } catch (IllegalArgumentException e) {
                        return false;
                    }
                })
                .map(InstrumentType::valueOf)
                .collect(Collectors.toSet());

        // imagePath만 null이고 나머지는 초기값이 존재함.
        Song aiSong = Song.builder()
                .user(user)
                .studio(studio)
                .moodType(requestDto.getMood())
                .genreType(requestDto.getGenre())
                .viewCount(0)
                .likesCount(0)
                .name(requestDto.getName())
                .filePath(requestDto.getAiSongFilePath())
                .isAIUsed(true)
                .instruments(instruments)
                .build();

        // 1. DB에 저장
        Song savedSong = songRepository.save(aiSong);

        // 2. DTO 응답 객체 생성
        AISongRegisterResponseDto response = null;
        try {
            response = AISongRegisterResponseDto.builder()
                    .aiSongId(savedSong.getId())
                    .userId(savedSong.getUser().getId())
                    .studioId(savedSong.getStudio().getId())
                    .viewCount(savedSong.getViewCount())
                    .likesCount(savedSong.getLikesCount())
                    .mood(savedSong.getMoodType())
                    .genre(savedSong.getGenreType())
                    .name(savedSong.getName())
                    .isAIUsed(savedSong.getIsAIUsed())
                    .instruments(savedSong.getInstruments()
                            .stream()
                            .map(Enum::toString)
                            .collect(Collectors.toList()))
                    .signedUrl(s3Service.getCloudFrontUrl(savedSong.getFilePath()).toString())
                    .build();
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }

        // 3. WebSocket으로 클라이언트에게 알림 전송
        webSocketHandler.sendToUser(userId, response);

        return response;
    }

    // 기본곡을 AI를 이용해서 작곡 요청
    public void requestSongComposition(int userId, int basicSongId) throws MalformedURLException {
        Song basicSong = songRepository.findById(basicSongId)
                .orElseThrow(() -> new NoSuchElementException("기본곡을 찾을 수 없습니다."));
        int songUserId = basicSong.getUser().getId();

        // 1. 원본 음성 정보 가져오기 (분위기, 장르, 악기 종류)
        String mood = basicSong.getMoodType().toString();
        String genre = basicSong.getGenreType().toString();
        String name = basicSong.getName();
        Integer studioId = basicSong.getStudio().getId();
        Set<InstrumentType> instruments = basicSong.getInstruments();

        // 2. instruments를 콤마로 연결된 소문자 문자열로 변환
        String instrumentsString = instruments.stream()
                .map(Enum::toString)
                .map(String::toLowerCase)
                .collect(Collectors.joining(", "));

        String prompt = String.format(
                "%s music featuring %s, evoking a sense of %s.",
                genre.toLowerCase(),
                instrumentsString,
                mood.toLowerCase()
        );

        // 4. 원본 음성 S3 URL 가져오기
        String basicSongFilePath = basicSong.getFilePath(); // ex) "songs/user123/abc.wav"

        // 5. CloudFront signed URL 생성
        URL signedUrl = s3Service.getCloudFrontUrl(basicSongFilePath);


        // 6. AI 서버 요청 payload 생성
        Map<String, Object> payload = Map.of(
                "userId", userId,
                "studioId", studioId,
                "signedUrl", signedUrl,
                "instrumentsString", instrumentsString,
                "mood", mood,
                "genre", genre,
                "name", name,
                "prompt", prompt
        );

        // 6. 비동기로 AI 서버 호출
        // 로직이 변경돼서 시간되면 AI서버에서 202오면 얘도 202 반환하도록 하게 수정하기
        // 다른 쓰레드에서 실행 중인 애를 현재 쓰레드에서 실행하도록!
        CompletableFuture.runAsync(() -> {
            webClient.post()
                    .uri("http://127.0.0.1:8000/api/compose") // FastAPI 포트 확인!
                    .header("Content-Type", "application/json")
                    .bodyValue(payload)
                    .retrieve()
                    .toBodilessEntity()
                    .doOnSuccess(res -> log.info("AI 서버 요청 성공"))
                    .doOnError(e -> log.error("AI 서버 요청 실패", e))
                    .subscribe(); // 요청 실행
        });
    }

    public URL  checkMalformedUrlException(String filePath) {
        try {
            return s3Service.getCloudFrontUrl(filePath);
        } catch (MalformedURLException e) {
            throw new RuntimeException("잘못된 파일 경로입니다.");
        }
    }
}

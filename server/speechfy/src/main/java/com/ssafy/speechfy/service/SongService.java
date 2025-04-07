package com.ssafy.speechfy.service;
import com.ssafy.speechfy.dto.song.*;
import com.ssafy.speechfy.entity.Song;
import com.ssafy.speechfy.entity.Studio;
import com.ssafy.speechfy.entity.User;
import com.ssafy.speechfy.enums.InstrumentType;
import com.ssafy.speechfy.repository.SongRepository;
import com.ssafy.speechfy.repository.StudioRepository;
import com.ssafy.speechfy.repository.UserRepository;
import com.ssafy.speechfy.websocket.AIWebSocketHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
    private final SongRepository songRepository;
    private final UserRepository userRepository;
    private final StudioRepository studioRepository;
    private final S3Service s3Service;
    private final WebClient webClient;
    private final AIWebSocketHandler webSocketHandler;

    /**
     * 마이페이지 완성곡 리스트 반환
     * songListResponseDto
     * 페이지네이션 기능 추가
     */
    public SongListResponseDto getAllSongs(Integer userId, Pageable pageable) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        Page<Song> songList = songRepository.findPageByUser(user, pageable);

        List<SongResponseDto> songResponseDtoList = songList.getContent().stream().map(song -> {
            URL songPresignedUrl = s3Service.generatePresignedUrl(song.getFilePath());
            URL imagePresignedUrl = s3Service.generatePresignedUrl(song.getImagePath());

            return SongResponseDto.builder()
                    .songId(song.getId())
                    .userId(song.getUser().getId())
                    .songPresignedUrl(songPresignedUrl.toString())
                    .viewCount(song.getViewCount())
                    .likesCount(song.getLikesCount())
                    .imagePresignedUrl(imagePresignedUrl.toString())
                    .genre(song.getGenreType().toString())
                    .mood(song.getMoodType().toString())
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

        URL songPresignedUrl = s3Service.generatePresignedUrl(song.getFilePath());
        URL imagePresignedUrl = s3Service.generatePresignedUrl(song.getImagePath());

        return SongResponseDto.builder()
                .songId(song.getId())
                .userId(song.getUser().getId())
                .songPresignedUrl(songPresignedUrl.toString())
                .viewCount(song.getViewCount())
                .likesCount(song.getLikesCount())
                .imagePresignedUrl(imagePresignedUrl.toString())
                .genre(song.getGenreType().toString())
                .mood(song.getMoodType().toString())
                .build();
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
    public void createCoverById(int id) {}

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
                .isAIUsed(savedSong.isAIUsed())
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
                    .isAIUsed(savedSong.isAIUsed())
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

}

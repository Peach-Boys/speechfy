package com.ssafy.speechfy.service;

import com.ssafy.speechfy.dto.song.*;
import com.ssafy.speechfy.entity.Song;
import com.ssafy.speechfy.entity.Studio;
import com.ssafy.speechfy.entity.User;
import com.ssafy.speechfy.enums.GenreType;
import com.ssafy.speechfy.enums.MoodType;
import com.ssafy.speechfy.repository.SongRepository;
import com.ssafy.speechfy.repository.StudioRepository;
import com.ssafy.speechfy.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URL;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SongService {
    private final SongRepository songRepository;
    private final UserRepository userRepository;
    private final StudioRepository studioRepository;
    private final S3Service s3Service;

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

        // imagePath만 null이고 나머지는 초기값이 존재함.
        Song basicSong = Song.builder()
                .user(user)
                .studio(studio)
                .moodType(MoodType.valueOf(requestDto.getMood()))
                .genreType(GenreType.valueOf(requestDto.getGenre()))
                .viewCount(0)
                .likesCount(0)
                .name(requestDto.getName())
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
                .name(savedSong.getName())
                .isAIUsed(savedSong.isAIUsed())
                .build();
    }

}

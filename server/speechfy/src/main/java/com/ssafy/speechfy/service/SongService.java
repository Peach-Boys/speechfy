package com.ssafy.speechfy.service;

import com.ssafy.speechfy.dto.song.songResponseDto;
import com.ssafy.speechfy.entity.Song;
import com.ssafy.speechfy.entity.User;
import com.ssafy.speechfy.repository.SongRepository;
import com.ssafy.speechfy.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.ssafy.speechfy.dto.song.songListResponseDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class SongService {
    private final SongRepository songRepository;
    private final UserRepository userRepository;

    public SongService(SongRepository songRepository, UserRepository userRepository) {
        this.songRepository = songRepository;
        this.userRepository = userRepository;
    }

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

}

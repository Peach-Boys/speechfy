package com.ssafy.speechfy.service;

import com.ssafy.speechfy.dto.song.songDto;
import com.ssafy.speechfy.entity.Song;
import com.ssafy.speechfy.repository.SongRepository;
import org.springframework.stereotype.Service;
import com.ssafy.speechfy.dto.song.songListResponseDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SongService {
    private final SongRepository songRepository;

    public SongService(final SongRepository songRepository) {
        this.songRepository = songRepository;
    }

    /**
     * 완성곡 리스트 반환
     * songListResponseDto
     */
    public songListResponseDto getAllSongs() {
        Song song1 = new Song();
        song1.setName("aa");
        Song song2 = new Song();
        songRepository.save(song1);
        return null;
    }

    /**
     * id 기반 완성곡 반환
     *
     */
    public songDto getSongById(int id) {
        return null;
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
    public void deleteSongById(int id) {}

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

package com.ssafy.speechfy.repository;

import com.ssafy.speechfy.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SongRepository extends JpaRepository<Song, Integer> {
    List<Song> findByStudioId(int studioId);
}

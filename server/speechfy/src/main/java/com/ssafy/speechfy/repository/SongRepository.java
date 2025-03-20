package com.ssafy.speechfy.repository;

import com.ssafy.speechfy.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongRepository extends JpaRepository<Song, Integer> {
}

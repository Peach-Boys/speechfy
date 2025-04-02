package com.ssafy.speechfy.repository;

import com.ssafy.speechfy.entity.Song;
import com.ssafy.speechfy.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SongRepository extends JpaRepository<Song, Integer> {
    Page<Song> findPageByUser(@Param("user") User user, Pageable pageable);
    void deleteById(int id);
    List<Song> findByStudioId(int studioId);
}

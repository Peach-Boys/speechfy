package com.ssafy.speechfy.repository;

import com.ssafy.speechfy.entity.Song;
import com.ssafy.speechfy.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SongRepository extends JpaRepository<Song, Integer> {
    List<Song> findByUser(User user);
    List<Song> findByStudioId(int studioId);

    @Query("select distinct s from Song s " +
            "join fetch s.songMoods sm " +
            "join fetch sm.mood " +
            "where s.user = :user")
    Page<Song> findByUserWithMood(@Param("user") User user, Pageable pageable);
}

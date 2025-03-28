package com.ssafy.speechfy.repository;

import com.ssafy.speechfy.entity.Song;
import com.ssafy.speechfy.entity.Track;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(false)
class TrackRepositoryTest {
    @Autowired
    TrackRepository trackRepository;
    @PersistenceContext
    EntityManager em;

    @Test
    void findByStudio() {
        Track track = new Track();
        track.setName("track");
        trackRepository.save(track);
        em.flush();
        em.clear();
        Optional<Track> findTrack = trackRepository.findById(track.getId());
        System.out.println(findTrack.get().getName());
    }
}
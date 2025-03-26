package com.ssafy.speechfy.repository;

import com.ssafy.speechfy.entity.Song;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(false)
class SongRepositoryTest {

    @Autowired SongRepository songRepository;
    @PersistenceContext
    EntityManager em;

    @Test
    public void testSave() {
        Song song1 = new Song();
        song1.setName("song1");
        songRepository.save(song1);
        em.flush();
        em.clear();
        List<Song> findSong = songRepository.findByStudioId(1);
        System.out.println(findSong);
    }
}
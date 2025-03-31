package com.ssafy.speechfy.repository;

import com.ssafy.speechfy.dto.song.songResponseDto;
import com.ssafy.speechfy.entity.Song;
import com.ssafy.speechfy.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(false)
class SongRepositoryTest {

    @Autowired SongRepository songRepository;
    @Autowired UserRepository userRepository;
    @PersistenceContext
    EntityManager em;

    @Test
    public void testSave() {
        em.clear();

    }
}
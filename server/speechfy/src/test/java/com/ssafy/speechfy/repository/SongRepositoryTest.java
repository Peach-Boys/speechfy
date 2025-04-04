package com.ssafy.speechfy.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@Rollback(false)
class SongRepositoryTest {

    @Autowired SongRepository songRepository;
    @Autowired UserRepository userRepository;
    @PersistenceContext
    EntityManager em;

}

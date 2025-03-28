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
        Song song1 = new Song();
        song1.setName("song1");
        songRepository.save(song1);
        em.flush();
        em.clear();
        Pageable pageable = PageRequest.of(0, 3);
        User user = userRepository.findById(1);
        Page<Song> songList = songRepository.findByUserWithMood(user, pageable);

        List<songResponseDto> songResponseDtoList = songList.getContent().stream().map(song -> {
            List<String> moodNames = song.getSongMoods().stream()
                    .map(songMood -> songMood.getMood().getName())
                    .collect(Collectors.toList());
            songResponseDto dto = new songResponseDto();
            dto.setSongId(song.getId());
            dto.setUserId(song.getUser().getId());
            dto.setSongPresignedUrl(song.getFilePath());
            dto.setViewCount(song.getViewCount());
            dto.setLikes(song.getLikes());
            dto.setImagePresignedUrl(song.getImagePath());
            dto.setGenre(song.getGenre().getName());
            dto.setMood(moodNames);
            return dto;
        }).collect(Collectors.toList());
    }
}
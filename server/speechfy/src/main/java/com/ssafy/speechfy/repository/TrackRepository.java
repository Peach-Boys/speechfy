package com.ssafy.speechfy.repository;

import com.ssafy.speechfy.entity.Record;
import com.ssafy.speechfy.entity.Track;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Repository
public interface TrackRepository extends JpaRepository<Track, Integer> {
    List<Track> findById(Track track);

}

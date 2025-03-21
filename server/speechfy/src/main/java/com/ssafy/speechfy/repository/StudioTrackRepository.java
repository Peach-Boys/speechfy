package com.ssafy.speechfy.repository;

import com.ssafy.speechfy.entity.Record;
import com.ssafy.speechfy.entity.Studio;
import com.ssafy.speechfy.entity.StudioTrack;
import com.ssafy.speechfy.entity.Track;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudioTrackRepository extends JpaRepository<StudioTrack, Integer> {

    List<StudioTrack> findByStudio(Studio studio);

    Optional<StudioTrack> findByStudioAndTrack(Studio studio, Track track);
}

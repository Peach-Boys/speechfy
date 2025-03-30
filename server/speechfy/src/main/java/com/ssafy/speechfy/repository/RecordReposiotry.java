package com.ssafy.speechfy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ssafy.speechfy.entity.Record;
import java.util.Optional;

@Repository
public interface RecordReposiotry extends JpaRepository<Record, Integer> {
    Optional<Record> findById(Integer trackId);
}

package com.ssafy.speechfy.repository;

import com.ssafy.speechfy.entity.Studio;
import com.ssafy.speechfy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudioRepository extends JpaRepository<Studio, Integer>  {
    List<Studio> findByUser(User user);

}

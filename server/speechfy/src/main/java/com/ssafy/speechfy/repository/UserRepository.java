package com.ssafy.speechfy.repository;

import com.ssafy.speechfy.entity.Track;
import com.ssafy.speechfy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findById(int id);
}

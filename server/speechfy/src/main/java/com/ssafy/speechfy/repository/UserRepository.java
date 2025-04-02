package com.ssafy.speechfy.repository;

import com.ssafy.speechfy.entity.Track;
import com.ssafy.speechfy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findById(int id);
    // 카카오 아이디로 사용자 찾기

    Optional<User> findByAuthId(String kakaoId);
}

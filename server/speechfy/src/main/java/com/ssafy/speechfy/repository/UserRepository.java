package com.ssafy.speechfy.repository;

import com.ssafy.speechfy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}

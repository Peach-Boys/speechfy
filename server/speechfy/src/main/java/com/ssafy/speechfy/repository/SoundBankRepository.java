package com.ssafy.speechfy.repository;

import com.ssafy.speechfy.entity.SoundBank;
import com.ssafy.speechfy.entity.SoundBankId;
import com.ssafy.speechfy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SoundBankRepository extends JpaRepository<SoundBank, SoundBankId> {
    List<SoundBank> findByUser(User user);
}

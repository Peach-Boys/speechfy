package com.ssafy.speechfy.repository;

import com.ssafy.speechfy.entity.SoundBank;
import com.ssafy.speechfy.entity.SoundBankId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SoundBankRepository extends JpaRepository<SoundBank, SoundBankId> {
}

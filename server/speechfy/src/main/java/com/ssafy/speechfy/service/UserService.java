package com.ssafy.speechfy.service;

import com.ssafy.speechfy.repository.UserRepository;
import jakarta.validation.constraints.Null;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service

public class UserService {
    private final WorkService workService;

    public UserService(WorkService workService) {
        this.workService = workService;
    }

    public Void deleteUser() {

       // workService.deleteStudioList();
        return null;
    }
}

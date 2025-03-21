package com.ssafy.speechfy.service;

import com.ssafy.speechfy.dto.work.common.recordDto;
import com.ssafy.speechfy.dto.work.recordResponseDto;
import com.ssafy.speechfy.dto.work.trackResponseDto;
import com.ssafy.speechfy.dto.work.workListResponseDto;
import com.ssafy.speechfy.dto.work.workResponseDto;
import com.ssafy.speechfy.entity.Record;
import com.ssafy.speechfy.repository.RecordReposiotry;
import com.ssafy.speechfy.entity.*;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WorkService {
    private final RecordReposiotry recordReposiotry;

    public WorkService(RecordReposiotry recordReposiotry) {
        this.recordReposiotry = recordReposiotry;
    }

    public workListResponseDto getStudioList(){

        return null;
    }

    public void createStudio(){

    }

    public void deleteStudio(){

    }

    public workListResponseDto getWorkList(){
        return null;
    }

    public void updateWorkList(){

    }

    public void deleteWorkList(){

    }

    public workResponseDto createWork(){
        return null;
    }

    public trackResponseDto getTrack(){
        return null;
    }

    public void updateTrack(){

    }

    // 레코드 반환
    public recordResponseDto getRecord(Integer trackId){
        Optional<Record> optionalRecord = recordReposiotry.findById(trackId);


        if (optionalRecord.isPresent()) { // 값이 존재하면
          Record record = optionalRecord.get(); // 안전하게 꺼내서 사용
            
            recordDto dto = new recordDto( //dto에 담기
            record.getId(),
            record.getFilePath()
            );
           return new recordResponseDto(dto);

        } else { // 예외처리
            System.out.println("해당 레코드가 존재하지 않습니다.");
            return null;
        }

    }

}

package com.ssafy.speechfy.service;

import com.ssafy.speechfy.dto.work.*;
import com.ssafy.speechfy.dto.work.common.recordDto;
import com.ssafy.speechfy.dto.work.common.studioDto;
import com.ssafy.speechfy.dto.work.common.trackDto;
import com.ssafy.speechfy.dto.work.common.workDto;
import com.ssafy.speechfy.entity.Record;
import com.ssafy.speechfy.repository.*;
import com.ssafy.speechfy.entity.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WorkService {
    private final WorkService workService;
    private final RecordReposiotry recordReposiotry;
    private final TrackRepository trackReposiotry;
    private final StudioRepository studioReposiotry;
    private final StudioTrackRepository studioTrackRepository;
    private final UserRepository userReposiotry;

    public WorkService(RecordReposiotry recordReposiotry, TrackRepository trackReposiotry, WorkService workService, StudioRepository studioReposiotry, StudioTrackRepository studioTrackRepository, UserRepository userReposiotry) {
        this.recordReposiotry = recordReposiotry;
        this.trackReposiotry = trackReposiotry;
        this.workService = workService;
        this.studioReposiotry = studioReposiotry;

        this.studioTrackRepository = studioTrackRepository;
        this.userReposiotry = userReposiotry;
    }

    public studioResponseDto getStudioList(Integer userId) {
        Optional<User> optionalUser = userReposiotry.findById(userId);
        User user;
        if (optionalUser.isPresent()) { // 값이 존재하면
            user = optionalUser.get(); // 안전하게 꺼내서 사용
        } else { // 예외처리
            return null;
        }

        List<Studio> studioList = studioReposiotry.findByUser(user);
        List<studioDto> studioDtoList = new ArrayList<>();
        if (studioList.size() > 0) {
            for (Studio studio : studioList) {
                studioDto dto = workService.getStudioDto(studio.getId());
                studioDtoList.add(dto);
            }
        }
        studioResponseDto responseDto = new studioResponseDto( studioDtoList);
        return responseDto;
    }

    public void createStudio(){

    }

    public void deleteStudio(){

    }

    public workListResponseDto getWorkList(Integer studioId) {
        // 1. studioId를 통해 해당하는 트랙을 찾는다. -> 스튜디오트랙테이블이용
        Optional<Studio> optionalStudio = studioReposiotry.findById(studioId);
        Studio studio;
        if (optionalStudio.isPresent()) { // 값이 존재하면
            studio = optionalStudio.get(); // 안전하게 꺼내서 사용
        } else { // 예외처리
            return null;
        }

        List<StudioTrack> studioTrackList = studioTrackRepository.findByStudio(studio);
        List<workDto> trackList = new ArrayList<>();
        if (studioTrackList.size() > 0) {
            for (StudioTrack studioTrack : studioTrackList) {
                workDto dto = workService.getWorkDto(studioId,studioTrack.getTrack().getId());
                trackList.add(dto);
            }
        }
        workListResponseDto responseDto = new workListResponseDto( trackList);
        return responseDto;

    }

    public void updateWorkList(){

    }

    public void deleteWorkList(){

    }

    public workResponseDto createWork(Integer userId, workCreateDto workCreateDto) {
        // 저장 로직 중요한듯

        return null;
    }



    public trackResponseDto getTrack(Integer trackId){
        trackDto trackDto = workService.getTrackDto(trackId);
        if(trackDto == null){return null;}
        else return new trackResponseDto(trackDto);



    }

    public void updateTrack(){

    }

    // 레코드 반환
    public recordResponseDto getRecord(Integer trackId){
        recordDto dto = workService.getRecordDto(trackId); //레코드 dto호출
        if(dto == null){
              return null;
        }else{
            return new recordResponseDto(dto);
        }
    }

    private recordDto getRecordDto(Integer trackId){
        Optional<Record> optionalRecord = recordReposiotry.findById(trackId);
        if (optionalRecord.isPresent()) { // 값이 존재하면
            Record record = optionalRecord.get(); // 안전하게 꺼내서 사용
            recordDto dto = new recordDto( //dto에 담기
                    record.getId(),
                    record.getFilePath()
            );
            return dto;

        } else { // 예외처리
            System.out.println("해당 레코드가 존재하지 않습니다.");
            return null;
        }
    }

    private trackDto getTrackDto(Integer trackId){
        Optional<Track> optionalTrack = trackReposiotry.findById(trackId);
        if (optionalTrack.isPresent()) { // 값이 존재하면
            Track track = optionalTrack.get(); // 안전하게 꺼내서 사용
            trackDto dto = new trackDto( //dto에 담기
                    track.getId(),
                    track.getInstrument().name(),// 이거 이넘으롱 어떻게 받음 ?
                    track.getFilePath(),
                    track.getName()
            );
            return dto;
        } else { // 예외처리
            System.out.println("해당 레코드가 존재하지 않습니다.");
            return null;
        }
    }

    private studioDto getStudioDto(Integer studioId){
        Optional<Studio> optionalStudio = studioReposiotry.findById(studioId);
        Studio studio;
        if (optionalStudio.isPresent()) { // 값이 존재하면
            studio = optionalStudio.get(); // 안전하게 꺼내서 사용
        } else { // 예외처리
            return null;
        }

        List<StudioTrack> StudioTrackList = studioTrackRepository.findByStudio(studio);
        List<String> instrumentList = new ArrayList<String>();

        if(StudioTrackList.size() > 0) {
            for (StudioTrack studioTrack : StudioTrackList) {
               // Track track = trackReposiotry.findById(); /// studioTrack.getTrackId넣기 지금 안되서 못넣음
            }
        }

        studioDto dto = new studioDto(
                studio.getId(),
                studio.getUser().getId(),
                studio.getName(),
                instrumentList,
                null
        );

        return dto;



    }

    public workDto getWorkDto(Integer studioId, Integer trackId){
        recordDto recordDto = workService.getRecordDto(trackId);//레코드 dto호출
        if(recordDto == null){return null;}

        trackDto trackDto = workService.getTrackDto(trackId);// 트랙 dto호출
        if(trackDto == null){return null;}
/// ////////////////////////////////////////////
        Optional<Studio> optionalStudio = studioReposiotry.findById(studioId);
        Studio studio;
        if (optionalStudio.isPresent()) {
            studio = optionalStudio.get();
        }else{ // 예외처리하기
            return null;
        }

        Optional<Track> optionalTrack = trackReposiotry.findById(trackId);
        Track track;
        if (optionalTrack.isPresent()) {
            track = optionalTrack.get();
        }else{ // 예외처리하기
            return null;
        }

        Optional<StudioTrack> optionalStudioTrack = studioTrackRepository.findByStudioAndTrack(studio, track);
        StudioTrack studioTrack = null;
        if (optionalStudioTrack.isPresent()) {
            studioTrack = optionalStudioTrack.get();
        }else{ // 예외처리하기
            return null;
        }

        workDto dto = new workDto(
                studioTrack.getOrder(),
                trackDto,
                recordDto
        );

        return dto;
    }




}

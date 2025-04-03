package com.ssafy.speechfy.service;

import com.ssafy.speechfy.controller.WebExceptionHandler;
import com.ssafy.speechfy.dto.work.studio.StudioResponseDto;
import com.ssafy.speechfy.dto.work.track.*;
import com.ssafy.speechfy.dto.work.studio.StudioSimpleDto;
import com.ssafy.speechfy.dto.work.studio.StudioCreateDto;
import com.ssafy.speechfy.dto.work.studio.StudioListResponseDto;
import com.ssafy.speechfy.entity.Record;
import com.ssafy.speechfy.enums.InstrumentType;
import com.ssafy.speechfy.oauth.SecurityUtil;
import com.ssafy.speechfy.repository.*;
import com.ssafy.speechfy.entity.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@RequiredArgsConstructor
@Service
public class WorkService {

    private final RecordReposiotry recordReposiotry;
    private final TrackRepository trackReposiotry;
    private final StudioRepository studioReposiotry;
    private final UserRepository userReposiotry;
    private final S3Service s3Service;

    private Integer getCurrentUserId() {
        return SecurityUtil.getCurrentUserId();
    }

    public StudioListResponseDto getStudioList(Integer userId) {
        Optional<User> optionalUser = userReposiotry.findById(userId);
        User user = checkElementException(optionalUser, "User not found");

        List<Studio> studioList = studioReposiotry.findByUser(user);
        List<StudioSimpleDto> studioSimpleDtoList = new ArrayList<>();
        if (!studioList.isEmpty()) {
            for (Studio studio : studioList) {
                StudioSimpleDto dto = getStudioSimpleDto(studio.getId());
                studioSimpleDtoList.add(dto);
            }
        }

        return new StudioListResponseDto(studioSimpleDtoList);
    }


    @Transactional
    public StudioResponseDto createStudio(StudioCreateDto studioCreateDto){
        Integer userId = getCurrentUserId();
        Optional<User> optionalUser = userReposiotry.findById(userId);
        User user = checkElementException(optionalUser, "User not found");

        Studio studio = new Studio(
                user,
                studioCreateDto.getStudioName()
                );
       studio = studioReposiotry.save(studio);
        return new StudioResponseDto(getStudio(studio.getId()));
    }

    @Transactional
    public void deleteStudio( Integer studioId){
        deleteTrackList(studioId);
        studioReposiotry.deleteById(studioId);
    }


    public TrackListResponseDto getStudio(Integer studioId) {
        // 1. studioId를 통해 해당하는 트랙을 찾는다. -> 스튜디오트랙테이블이용
        Optional<Studio> optionalStudio = studioReposiotry.findById(studioId);
        Studio studio = checkElementException(optionalStudio, "Studio not found");

        List<Track> trackList = trackReposiotry.findByStudio(studio);
        List<TrackResponseDto> trackResponseDtoList = new ArrayList<>();
        if (!trackList.isEmpty()) {
            for (Track track : trackList) {
                TrackResponseDto dto = getTrackResponseDto(track.getId());
                trackResponseDtoList.add(dto);
            }
        }

        return new TrackListResponseDto(studio.getId(), studio.getName(), trackResponseDtoList);
    }

    @Transactional
    public void updateTrackList(Integer studioId, TrackListUpdateDto trackListUpdateDto){
        // 트랙 내용 변경
        List<TrackUpdateDto> dtoList = trackListUpdateDto.getUpdateList();
        if(!dtoList.isEmpty()){
            for (TrackUpdateDto trackUpdateDto : dtoList) {
                int trackId = trackUpdateDto.getTrackId();
                updateTrack(studioId,trackId,trackUpdateDto);
            }
        }
    }

    @Transactional
    public void deleteTrack(Integer trackId){ // 사운드뱅크 삭제 위해 userId필요
        Optional<Track> optionalTrack = trackReposiotry.findById(trackId);
        Track track = checkElementException(optionalTrack, "Track not found");
        List<Track> trackList = trackReposiotry.findByRecord(track.getRecord());
        if(trackList.size() == 1){
            recordReposiotry.delete(track.getRecord());
        }
        trackReposiotry.delete(track);
    }

    @Transactional
    public void deleteTrackList(Integer studioId){
        // 스튜디오 트랙 리스트 호출
        Optional<Studio> optionalStudio = studioReposiotry.findById(studioId);
        Studio studio = checkElementException(optionalStudio, "Studio not found");

        Integer userId = getCurrentUserId();
        if(studio.getUser().getId() != userId){
            throw new WebExceptionHandler.UnauthorizedAccessException("잘못된 접근입니다: 해당 스튜디오는 사용자의 것이 아닙니다.");
        }

        List<Track> trackList = trackReposiotry.findByStudio(studio);
        if(!trackList.isEmpty()){
            for (Track track : trackList) {
                deleteTrack(track.getId());
            }
        }
    }

    @Transactional
    public TrackResponseDto createTrack(Integer studioId, TrackCreateDto trackCreateDto) {
        // 유저 엔티티 불러오기
        Integer userId = getCurrentUserId();
        Optional<User> optionalUser = userReposiotry.findById(userId);
        User user = checkElementException(optionalUser, "User not found");
        // 작업실 엔티티 불러오기
        Optional<Studio> optionalStudio = studioReposiotry.findById(studioId);
        Studio studio = checkElementException(optionalStudio, "Studio not found");
        //악기이넘사용
        Integer instrumentId = trackCreateDto.getInstrumentId();
        if (instrumentId < 0 || instrumentId >= InstrumentType.values().length) {
            throw new IllegalArgumentException("Invalid instrument id");
        }
        InstrumentType instrumentType = InstrumentType.values()[instrumentId];
        System.out.println(instrumentType.name());
        // 트랙 이름 자동 생성 -> 어떻게 생성해야할지 모르겠음
        String trackName = trackCreateDto.getTrackName();
        // 레코드 엔티티 불러오기
        Optional<Record> optionalRecord = recordReposiotry.findById(trackCreateDto.getRecordId());
        Record record;
        if (optionalRecord.isPresent()) {
            record = optionalRecord.get();
        } else { // 해당 레코드가 없으면 새로운 레코드 만들기
            String recordFilePath = "users/" + userId + "/record/" + trackCreateDto.getRecordUUID()+ ".wav";
            record = new Record(
                    recordFilePath
            );
            record = recordReposiotry.save(record);
        }
        //S3파일경로 만들기

        String trackFilePath = "users/" + userId + "/track/" + trackCreateDto.getTrackUUID() + ".wav";

        // 트랙 엔티티 생성하기
        Track track = new Track(
                user,
                instrumentType, //인스트러먼트 이넘이라 모르겠으
                record,
                studio,
                trackName,   // dto에서 네임을 안받은듯, 먼저 백에서 네임 자동생성 방식인ㄷ ㅡㅅ
                trackFilePath,
                trackCreateDto.getOrder()
        );
        track = trackReposiotry.save(track);

        return getTrackResponseDto(track.getId());
    }

    @Transactional
    public void createTrackFail( TrackCreateFailDto trackCreateFailDto){
        // 유저 엔티티 불러오기
        Integer userId = getCurrentUserId();
        String trackFilePath = "users/" + userId + "/track/"; //+ trackCreateFailDto.getTrackUUID() + ".wav";
        String recordFilePath = "users/" + userId + "/record/";// + trackCreateFailDto.getRecordUUID()+ ".wav";


        //s3내의 트랙파일 삭제하기
        if(trackCreateFailDto.getTrackUUID() != null){
            trackFilePath += trackCreateFailDto.getTrackUUID() + ".wav";
            System.out.println(trackFilePath);
        }
        //s3내의 레코드파일 삭제하기
        if(trackCreateFailDto.getRecordUUID() != null){
            recordFilePath += trackCreateFailDto.getRecordUUID() + ".wav";
            System.out.println(recordFilePath);
        }


    }
    @Transactional
    public void updateTrack(Integer studioId,Integer trackId, TrackUpdateDto trackUpdateDto){
        Optional<Track> optionalTrack = trackReposiotry.findById(trackId);
        Track track = checkElementException(optionalTrack, "Track not found");
        Optional<Studio> optionalStudio = studioReposiotry.findById(studioId);
        Studio studio = checkElementException(optionalStudio, "Studio not found");

        track.setName(trackUpdateDto.getTrackName());
        track.setOrder(trackUpdateDto.getOrder());
        trackReposiotry.save(track);
    }

    /// /////////////////////////////////////////////////////////////////////////////////////////////////////

    // 레코드 저장
    public RecordDto getRecordDto(Integer recordId){
        Optional<Record> optionalRecord = recordReposiotry.findById(recordId);
        Record record = checkElementException(optionalRecord, "Record not found");
        Integer userId = getCurrentUserId();
        String objectKey = "users/"+ userId.toString() +"/record/" + record.getId();
        return new RecordDto( //dto에 담기
                record.getId(),
                s3Service.generatePresignedUrl(objectKey).toString()
        );
    }

    public TrackDto getTrackDto(Integer trackId){
        Optional<Track> optionalTrack = trackReposiotry.findById(trackId);
        Track track = checkElementException(optionalTrack, "Track not found");
        Integer userId = getCurrentUserId();
        String objectKey = "users/"+ userId.toString() + "/track/" + track.getId();

        return new TrackDto( //dto에 담기
                track.getId(),
                track.getInstrumentType().name(),// 이거 이넘으롱 어떻게 받음 ?
                s3Service.generatePresignedUrl(objectKey).toString(),
                track.getName(),
                track.getRecord().getId(),
                track.getOrder()
        );
    }

    // 트랙ID에 해당하는 트랙 반환
    public TrackResponseDto getTrackResponseDto(Integer trackId){
        TrackDto trackDto = getTrackDto(trackId);
        RecordDto recordDto = getRecordDto(trackDto.getRecordId());

        return new TrackResponseDto(
                trackDto,
                recordDto
        );
    }

    //리팩토링 클리어
    public StudioSimpleDto getStudioSimpleDto(Integer studioId){
        Optional<Studio> optionalStudio = studioReposiotry.findById(studioId);
        Studio studio = checkElementException(optionalStudio, "Studio not found");
        List<Track> trackList = trackReposiotry.findByStudio(studio);
        List<String> instrumentList = new ArrayList<String>();

        if(!trackList.isEmpty()) {
            for (Track track : trackList) {
                instrumentList.add(track.getInstrumentType().name());
            }
        }

        return new StudioSimpleDto(
                studio.getId(),
                studio.getUser().getId(),
                studio.getName(),
                instrumentList,
                studio.getUpdatedAt().toString()  // 불러오는 방식 모르겠음
        );
    }

    public static <T> T checkElementException(Optional<T> optional, String message) {
        if (optional.isPresent()) {
            return optional.get();
        } else {
            throw new NoSuchElementException(message);
        }
    }

}

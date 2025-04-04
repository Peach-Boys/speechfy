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

import java.net.MalformedURLException;
import java.net.URL;
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

    public StudioListResponseDto getStudioList() {
        Integer userId = getCurrentUserId();
        User user = userReposiotry.findById(userId)
                .orElseThrow(()-> new NoSuchElementException("User not found"));

        List<Studio> studioList = studioReposiotry.findByUser(user);
        List<StudioSimpleDto> studioSimpleDtoList = new ArrayList<>();
        for (Studio studio : studioList) {
            StudioSimpleDto dto = getStudioSimpleDto(studio.getId());
            studioSimpleDtoList.add(dto);
        }
        return new StudioListResponseDto(studioSimpleDtoList);
    }


    @Transactional
    public StudioResponseDto createStudio(StudioCreateDto studioCreateDto){
        Integer userId = getCurrentUserId();
        User user = userReposiotry.findById(userId).orElseThrow(
                () -> new NoSuchElementException("User not found"));

        Studio studio = new Studio(
                user,
                studioCreateDto.getStudioName()
                );
       Studio saveStudio = studioReposiotry.save(studio);
        return getStudio(saveStudio.getId());
    }

    @Transactional
    public void deleteStudio( Integer studioId){
        deleteTrackList(studioId);
        studioReposiotry.deleteById(studioId);
    }


    public StudioResponseDto getStudio(Integer studioId) {
        // 1. studioId를 통해 해당하는 트랙을 찾는다. -> 스튜디오트랙테이블이용
        Studio studio = studioReposiotry.findById(studioId)
                .orElseThrow(() -> new NoSuchElementException("Studio not found"));
        List<Track> trackList = trackReposiotry.findByStudio(studio);
        List<TrackResponseDto> trackResponseDtoList = new ArrayList<>();
        for (Track track : trackList) {
            TrackResponseDto dto = getTrackResponseDto(track.getId());
            trackResponseDtoList.add(dto);
        }
        return new StudioResponseDto(
                studio.getId(),
                studio.getName(),
                trackResponseDtoList);
    }

    @Transactional
    public void updateTrackList(Integer studioId, TrackListUpdateDto trackListUpdateDto){
        List<TrackUpdateDto> dtoList = trackListUpdateDto.getUpdateList();
        for (TrackUpdateDto trackUpdateDto : dtoList) {
            int trackId = trackUpdateDto.getTrackId();
            updateTrack(studioId,trackId,trackUpdateDto);
        }
    }

    @Transactional
    public void deleteTrack(Integer trackId){
        Track track = trackReposiotry.findById(trackId)
                .orElseThrow(() -> new NoSuchElementException("Track not found"));
        List<Track> trackList = trackReposiotry.findByRecord(track.getRecord());
        if(trackList.size() == 1) recordReposiotry.delete(track.getRecord());
        trackReposiotry.delete(track);
    }

    @Transactional
    public void deleteTrackList(Integer studioId){
        Studio studio = studioReposiotry.findById(studioId)
                .orElseThrow(() -> new NoSuchElementException("Studio not found"));
        Integer userId = getCurrentUserId();
        if(studio.getUser().getId() != userId){
            throw new WebExceptionHandler.UnauthorizedAccessException("잘못된 접근입니다: 해당 스튜디오는 사용자의 것이 아닙니다.");
        }
        List<Track> trackList = trackReposiotry.findByStudio(studio);
        for (Track track : trackList) deleteTrack(track.getId());
    }

    @Transactional
    public TrackResponseDto createTrack(Integer studioId, TrackCreateDto trackCreateDto) {
        Integer userId = getCurrentUserId();
        User user = userReposiotry.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        Studio studio = studioReposiotry.findById(studioId)
                .orElseThrow(() -> new NoSuchElementException("Studio not found"));

        String instrument = trackCreateDto.getInstrument();
        InstrumentType instrumentType = InstrumentType.valueOf(instrument.toUpperCase());

        Optional<Record> optionalRecord = recordReposiotry.findById(trackCreateDto.getRecordId());
        Record record = createRecord( optionalRecord, userId, trackCreateDto);
        String trackFilePath = "users/" + userId + "/track/" + trackCreateDto.getTrackUUID() + ".wav";
        Track track = new Track(
                user,
                instrumentType, //인스트러먼트 이넘이라 모르겠으
                record,
                studio,
                trackCreateDto.getTrackName(),
                trackFilePath,
                trackCreateDto.getOrder()
        );
        Track saveTrack = trackReposiotry.save(track);

        return getTrackResponseDto(saveTrack.getId());
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
        }
        //s3내의 레코드파일 삭제하기
        if(trackCreateFailDto.getRecordUUID() != null){
            recordFilePath += trackCreateFailDto.getRecordUUID() + ".wav";
        }
    }

    @Transactional
    public void updateTrack(Integer studioId,Integer trackId, TrackUpdateDto trackUpdateDto){
        Track track = trackReposiotry.findById(trackId)
                .orElseThrow(() -> new NoSuchElementException("Track not found"));

        track.setName(trackUpdateDto.getTrackName());
        track.setOrder(trackUpdateDto.getOrder());
        trackReposiotry.save(track);
    }

    /// /////////////////////////////////////////////////////////////////////////////////////////////////////

    // 레코드 저장
    public RecordDto getRecordDto(Integer recordId){
        Record record = recordReposiotry.findById(recordId)
                .orElseThrow(() -> new NoSuchElementException("Record not found"));
        Integer userId = getCurrentUserId();
        String objectKey = "users/"+ userId.toString() +"/record/" + record.getId();
        return new RecordDto(
                record.getId(),
                checkMalformedUrlException(objectKey).toString()
        );
    }

    public Record createRecord(Optional<Record> optionalRecord,  Integer userId, TrackCreateDto trackCreateDto){
        if (optionalRecord.isPresent()) {
            return  optionalRecord.get();
        } else { // 해당 레코드가 없으면 새로운 레코드 만들기
            String recordFilePath = "users/" + userId + "/record/" + trackCreateDto.getRecordUUID()+ ".wav";
            Record record = new Record(recordFilePath);
            Record saveRecord = recordReposiotry.save(record);
            return saveRecord;
        }
    }

    public TrackDto getTrackDto(Integer trackId){
        Track track =  trackReposiotry.findById(trackId)
                .orElseThrow(() -> new NoSuchElementException("Track not found"));
        Integer userId = getCurrentUserId();
        String objectKey = "users/"+ userId.toString() + "/track/" + track.getId();

        return new TrackDto(
                track.getId(),
                track.getInstrumentType().name(),
                checkMalformedUrlException(objectKey).toString(),
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
        Studio studio = studioReposiotry.findById(studioId)
                .orElseThrow(() -> new NoSuchElementException("Studio not found"));
        List<Track> trackList = trackReposiotry.findByStudio(studio);
        List<String> instrumentList = new ArrayList<String>();
        for (Track track : trackList) instrumentList.add(track.getInstrumentType().name());

        return new StudioSimpleDto(
                studio.getId(),
                studio.getUser().getId(),
                studio.getName(),
                instrumentList,
                studio.getUpdatedAt().toString()  // 불러오는 방식 모르겠음
        );
    }

    public URL checkMalformedUrlException(String filePath) {
        try {
            return s3Service.getCloudFrontUrl(filePath);
        } catch (MalformedURLException e) {

            throw new RuntimeException("잘못된 파일 경로입니다.");
        }
    }
}

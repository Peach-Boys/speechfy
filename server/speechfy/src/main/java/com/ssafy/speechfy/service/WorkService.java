package com.ssafy.speechfy.service;

import com.ssafy.speechfy.dto.work.track.*;
import com.ssafy.speechfy.dto.work.studio.studioSimpleDto;
import com.ssafy.speechfy.dto.work.studio.studioCreateDto;
import com.ssafy.speechfy.dto.work.studio.studioListResponseDto;
import com.ssafy.speechfy.entity.Record;
import com.ssafy.speechfy.repository.*;
import com.ssafy.speechfy.entity.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class WorkService {

    private final RecordReposiotry recordReposiotry;
    private final TrackRepository trackReposiotry;
    private final StudioRepository studioReposiotry;
    private final UserRepository userReposiotry;
    private final S3Service s3Service;


    public WorkService(RecordReposiotry recordReposiotry, TrackRepository trackReposiotry, StudioRepository studioReposiotry,  UserRepository userReposiotry,  S3Service s3Service) {
        this.recordReposiotry = recordReposiotry;
        this.trackReposiotry = trackReposiotry;
        this.studioReposiotry = studioReposiotry;
        this.userReposiotry = userReposiotry;
        this.s3Service = s3Service;
    }

    //리팩토링 클리어
    public studioListResponseDto getStudioList(Integer userId) {
        Optional<User> optionalUser = userReposiotry.findById(userId);
        User user = checkElementException(optionalUser, "User not found");

        List<Studio> studioList = studioReposiotry.findByUser(user);
        List<studioSimpleDto> studioSimpleDtoList = new ArrayList<>();
        if (!studioList.isEmpty()) {
            for (Studio studio : studioList) {
                studioSimpleDto dto = getStudioDto(studio.getId());
                studioSimpleDtoList.add(dto);
            }
        }

        return new studioListResponseDto(studioSimpleDtoList);
    }


    @Transactional
    public void createStudio(Integer userId, studioCreateDto studioCreateDto){
        Optional<User> optionalUser = userReposiotry.findById(userId);
        User user = checkElementException(optionalUser, "User not found");

        Studio studio = new Studio(
                0,
                user,
                studioCreateDto.getStudioName()
        );
        studioReposiotry.save(studio);
    }

    @Transactional
    public void deleteStudio( Integer userId, Integer studioId){
        deleteTrackList(userId,studioId);
        studioReposiotry.deleteById(studioId);
    }


    public trackListResponseDto getTrackList(Integer studioId) {
        // 1. studioId를 통해 해당하는 트랙을 찾는다. -> 스튜디오트랙테이블이용
        Optional<Studio> optionalStudio = studioReposiotry.findById(studioId);
        Studio studio = checkElementException(optionalStudio, "Studio not found");

        List<Track> trackList = trackReposiotry.findByStudio(studio);
        List<trackResponseDto> trackResponseDtoList = new ArrayList<>();
        if (!trackList.isEmpty()) {
            for (Track track : trackList) {
                trackResponseDto dto = getTrackResponseDto(track.getId());
                trackResponseDtoList.add(dto);
            }
        }

        return new trackListResponseDto(studio.getId(), studio.getName(), trackResponseDtoList);
    }

    @Transactional
    public void updateWorkList(Integer studioId, trackListUpdateDto workListUpdateDto){
        // 트랙 내용 변경
        List<trackUpdateDto> dtoList = workListUpdateDto.getUpdateList();
        if(!dtoList.isEmpty()){
            for (trackUpdateDto trackUpdateDto : dtoList) {
                int trackId = trackUpdateDto.getTrackId();
                updateTrack(studioId,trackId,trackUpdateDto);
            }
        }
    }

    @Transactional
    public void deleteTrack(Integer trackId){ // 사운드뱅크 삭제 위해 userId필요
        // 스튜디오 트랙 리스트 호출
       ;
        // 스튜디오 트랙 리스트 삭제
        Optional<Track> optionalTrack = trackReposiotry.findById(trackId);
        Track track = checkElementException(optionalTrack, "Track not found");
        List<Track> trackList = trackReposiotry.findByRecord(track.getRecord());
        if(trackList.size() == 1){
            recordReposiotry.delete(track.getRecord());
        }
        trackReposiotry.delete(track);


    }

    @Transactional
    public void deleteTrackList(Integer userId, Integer studioId){ // 사운드뱅크 삭제 위해 userId필요
        // 스튜디오 트랙 리스트 호출
        Optional<Studio> optionalStudio = studioReposiotry.findById(studioId);
        Studio studio = checkElementException(optionalStudio, "Studio not found");
        List<Track> trackList = trackReposiotry.findByStudio(studio);
        if(!trackList.isEmpty()){
            for (Track track : trackList) {
                deleteTrack(track.getId());
            }
        }
    }

    @Transactional
    public trackResponseDto createTrack(Integer userId, Integer studioId, trackCreateDto workCreateDto) {
        // 유저 엔티티 불러오기
        Optional<User> optionalUser = userReposiotry.findById(userId);
        User user = checkElementException(optionalUser, "User not found");
        // 작업실 엔티티 불러오기
        Optional<Studio> optionalStudio = studioReposiotry.findById(studioId);
        Studio studio = checkElementException(optionalStudio, "Studio not found");
        //악기이넘사용
        Instrument instrument = Instrument.values()[workCreateDto.getInstrumentId()];
        System.out.println(instrument.name());
        // 트랙 이름 자동 생성 -> 어떻게 생성해야할지 모르겠음
        String trackName = "Track_" + System.currentTimeMillis();
        System.out.println(trackName);
        // 레코드 엔티티 불러오기
        Optional<Record> optionalRecord = recordReposiotry.findById(workCreateDto.getRecordId());
        Record record;
        if (optionalRecord.isPresent()) {
            record = optionalRecord.get();
        } else { // 해당 레코드가 없으면 새로운 레코드 만들기
            record = new Record(
                    0,
                    "저장할 파일에 대한 S3 경로 알고리즘 만들어야 함"
            );
            record = recordReposiotry.save(record);
        }
        //S3파일경로 만들기
        String filePath = "저장할 파일에 대한 S3 경로 알고리즘 만들어얗ㅁ";
        //s3Service.generatePresignedUrl("트랙이름 방식 어떻게 할 것인가요?");
        //????
        /// //////////

        // 트랙 엔티티 생성하기
        Track track = new Track(
                0,
                user,
                instrument, //인스트러먼트 이넘이라 모르겠으
                record,
                studio,
                trackName,   // dto에서 네임을 안받은듯, 먼저 백에서 네임 자동생성 방식인ㄷ ㅡㅅ
                filePath,
                workCreateDto.getOrder()
        );
        trackReposiotry.save(track);

        trackResponseDto trackResponseDto = getTrackResponseDto(track.getId());

        if(workCreateDto.getRecordId() != 0){ // 새로만들어진게 아니면 굳이 presignedUrl을 보낼 필요 x
            trackResponseDto.getRecordDto().setRecordPresignedUrl(null);
            System.out.println(trackResponseDto.getRecordDto().getRecordId());
        }

        return trackResponseDto;
    }

    @Transactional
    public void updateTrack(Integer studioId,Integer trackId, trackUpdateDto trackUpdateDto){
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
    public recordDto getRecordDto(Integer recordId){
        Optional<Record> optionalRecord = recordReposiotry.findById(recordId);
        Record record = checkElementException(optionalRecord, "Record not found");

        return new recordDto( //dto에 담기
                record.getId(),
                "presigne 주소 저장해서 반환"
                //s3Service.generatePresignedUrl("presigne 주소 저장해서 반환")
        );
    }

    public trackDto getTrackDto(Integer trackId){
        Optional<Track> optionalTrack = trackReposiotry.findById(trackId);
        Track track = checkElementException(optionalTrack, "Track not found");

        return new trackDto( //dto에 담기
                track.getId(),
                track.getInstrument().name(),// 이거 이넘으롱 어떻게 받음 ?
                "presigne 주소 저장해서 반환",
                // s3Service.generatePresignedUrl("presigne 주소 저장해서 반환"),
                track.getName(),
                track.getRecord().getId(),
                track.getOrder()
        );
    }

    // 트랙ID에 해당하는 트랙 반환
    public trackResponseDto getTrackResponseDto(Integer trackId){
        trackDto trackDto = getTrackDto(trackId);
        recordDto recordDto = getRecordDto(trackDto.getRecordId());

        return new trackResponseDto(
                trackDto,
                recordDto
        );
    }

    //리팩토링 클리어
    public studioSimpleDto getStudioDto(Integer studioId){
        Optional<Studio> optionalStudio = studioReposiotry.findById(studioId);
        Studio studio = checkElementException(optionalStudio, "Studio not found");
        List<Track> trackList = trackReposiotry.findByStudio(studio);
        List<String> instrumentList = new ArrayList<String>();

        if(!trackList.isEmpty()) {
            for (Track track : trackList) {
                instrumentList.add(track.getInstrument().name());//
            }
        }

        return new studioSimpleDto(
                studio.getId(),
                studio.getUser().getId(),
                studio.getName(),
                instrumentList,
                null    // 불러오는 방식 모르겠음
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

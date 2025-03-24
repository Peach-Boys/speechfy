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
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class WorkService {

    private final RecordReposiotry recordReposiotry;
    private final TrackRepository trackReposiotry;
    private final StudioRepository studioReposiotry;
    private final StudioTrackRepository studioTrackRepository;
    private final UserRepository userReposiotry;


    private final SoundBankRepository soundBankReposiotry;


    public WorkService(RecordReposiotry recordReposiotry, TrackRepository trackReposiotry, StudioRepository studioReposiotry, StudioTrackRepository studioTrackRepository, UserRepository userReposiotry,   SoundBankRepository soundBankReposiotry) {
        this.recordReposiotry = recordReposiotry;
        this.trackReposiotry = trackReposiotry;
        this.studioReposiotry = studioReposiotry;
        this.studioTrackRepository = studioTrackRepository;
        this.userReposiotry = userReposiotry;


        this.soundBankReposiotry = soundBankReposiotry;

    }

    public studioResponseDto getStudioList(Integer userId) {
        Optional<User> optionalUser = userReposiotry.findById(userId);
        User user = checkElementException(optionalUser, "User not found");

        List<Studio> studioList = studioReposiotry.findByUser(user);
        List<studioDto> studioDtoList = new ArrayList<>();
        if (studioList.size() > 0) {
            for (Studio studio : studioList) {
                studioDto dto = getStudioDto(studio.getId());
                studioDtoList.add(dto);
            }
        }
        return new studioResponseDto(studioDtoList);
    }

    public void createStudio(){

    }

    public void deleteStudio(){

    }

    public workListResponseDto getWorkList(Integer studioId) {
        // 1. studioId를 통해 해당하는 트랙을 찾는다. -> 스튜디오트랙테이블이용
        Optional<Studio> optionalStudio = studioReposiotry.findById(studioId);
        Studio studio = checkElementException(optionalStudio, "Studio not found");

        List<StudioTrack> studioTrackList = studioTrackRepository.findByStudio(studio);
        List<workDto> trackList = new ArrayList<>();
        if (studioTrackList.size() > 0) {
            for (StudioTrack studioTrack : studioTrackList) {
                workDto dto = getWorkDto(studioId,studioTrack.getTrack().getId());
                trackList.add(dto);
            }
        }
        return new workListResponseDto(trackList);

    }

    public void updateWorkList(){

    }

    public void deleteWorkList(){

    }

    public workResponseDto createWork(Integer userId, Integer studioId, workCreateDto workCreateDto) {
        // 유저 엔티티 불러오기
        Optional<User> optionalUser = userReposiotry.findById(userId);
        User user = checkElementException(optionalUser, "User not found");

        // 작업실 엔티티 불러오기
        Optional<Studio> optionalStudio = studioReposiotry.findById(studioId);
        Studio studio = checkElementException(optionalStudio, "Studio not found");

        //악기이넘사용
        Instrument instrument = Instrument.values()[workCreateDto.getInstrumentId()];

        // 레코드 엔티티 불러오기
        Optional<Record> optionalRecord = recordReposiotry.findById(workCreateDto.getRecordId());
        Record record = checkElementException(optionalRecord, "Record not found");

        //S3이용해 트랙Id불러오기
        //????
        /// //////////

        // 트랙 엔티티 생성하기
        Track track = new Track(
                0,
                user,
                instrument, //인스트러먼트 이넘이라 모르겠으
                record,
                null,   // dto에서 네임을 안받은듯
                 null
        );
        trackReposiotry.save(track);

        // 작업실 트랙 생성하기
        StudioTrackId studioTrackId = new StudioTrackId(
                studio.getId(),
                track.getId()
        );

        StudioTrack studioTrack = new StudioTrack(
                studioTrackId,
                studio,
                track,
                workCreateDto.getOrder()
        );
        studioTrackRepository.save(studioTrack);


        //사운드뱅크 생성하기
        SoundBankId soundBankId = new SoundBankId(
                user.getId(),
                track.getId()
        );

        SoundBank soundBank = new SoundBank(
                soundBankId,
                user,
                track
        );
        soundBankReposiotry.save(soundBank);

        // workResponseDto생성
        workDto dto = getWorkDto(studio.getId(), track.getId());
        return new workResponseDto(dto);
    }



    public trackResponseDto getTrack(Integer trackId){
        trackDto trackDto = getTrackDto(trackId);
        return new trackResponseDto(trackDto);



    }

    public void updateTrack(){

    }

    // 레코드 반환
    public recordResponseDto getRecord(Integer trackId){
        recordDto dto = getRecordDto(trackId); //레코드 dto호출
        return new recordResponseDto(dto);
    }

    private recordDto getRecordDto(Integer trackId){
        Optional<Record> optionalRecord = recordReposiotry.findById(trackId);
        Record record = checkElementException(optionalRecord, "Record not found");
        return new recordDto( //dto에 담기
                record.getId(),
                record.getFilePath()
        );
    }

    private trackDto getTrackDto(Integer trackId){
        Optional<Track> optionalTrack = trackReposiotry.findById(trackId);
        Track track = checkElementException(optionalTrack, "Track not found");
        return new trackDto( //dto에 담기
                track.getId(),
                track.getInstrument().name(),// 이거 이넘으롱 어떻게 받음 ?
                track.getFilePath(),
                track.getName()
        );
    }

    private studioDto getStudioDto(Integer studioId){
        Optional<Studio> optionalStudio = studioReposiotry.findById(studioId);
        Studio studio = checkElementException(optionalStudio, "Studio not found");
        List<StudioTrack> StudioTrackList = studioTrackRepository.findByStudio(studio);
        List<String> instrumentList = new ArrayList<String>();

        if(StudioTrackList.size() > 0) {
            for (StudioTrack studioTrack : StudioTrackList) {
                Optional<Track> optionalTrack = trackReposiotry.findById(studioTrack.getTrack().getId()); /// studioTrack.getTrackId넣기 지금 안되서 못넣음
                Track track = checkElementException(optionalTrack, "Track not found");
                instrumentList.add(track.getInstrument().name());//
            }
        }
        return new studioDto(
                studio.getId(),
                studio.getUser().getId(),
                studio.getName(),
                instrumentList,
                null    // 불러오는 방식 모르겠음
        );
    }

    public workDto getWorkDto(Integer studioId, Integer trackId){
        recordDto recordDto = getRecordDto(trackId);//레코드 dto호출
        trackDto trackDto = getTrackDto(trackId);// 트랙 dto호출

        Optional<Studio> optionalStudio = studioReposiotry.findById(studioId);
        Studio studio = checkElementException(optionalStudio, "Studio not found");

        Optional<Track> optionalTrack = trackReposiotry.findById(trackId);
        Track track = checkElementException(optionalTrack, "Track not found");

        Optional<StudioTrack> optionalStudioTrack = studioTrackRepository.findByStudioAndTrack(studio, track);
        StudioTrack studioTrack = checkElementException(optionalStudioTrack, "StudioTrack not found");

        return new workDto(
                studioTrack.getOrder(),
                trackDto,
                recordDto
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

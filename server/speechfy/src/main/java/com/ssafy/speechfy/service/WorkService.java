package com.ssafy.speechfy.service;

import com.ssafy.speechfy.dto.work.common.recordDto;
import com.ssafy.speechfy.dto.work.common.studioDto;
import com.ssafy.speechfy.dto.work.common.trackDto;
import com.ssafy.speechfy.dto.work.common.workDto;
import com.ssafy.speechfy.dto.work.record.recordResponseDto;
import com.ssafy.speechfy.dto.work.studio.studioCreateDto;
import com.ssafy.speechfy.dto.work.studio.studioResponseDto;
import com.ssafy.speechfy.dto.work.track.trackResponseDto;
import com.ssafy.speechfy.dto.work.track.trackUpdateDto;
import com.ssafy.speechfy.dto.work.work.workCreateDto;
import com.ssafy.speechfy.dto.work.work.workListResponseDto;
import com.ssafy.speechfy.dto.work.work.workListUpdateDto;
import com.ssafy.speechfy.dto.work.work.workResponseDto;
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
    private final StudioTrackRepository studioTrackRepository;
    private final UserRepository userReposiotry;
    private final SoundBankRepository soundBankReposiotry;

    private final S3Service s3Service;


    public WorkService(RecordReposiotry recordReposiotry, TrackRepository trackReposiotry, StudioRepository studioReposiotry, StudioTrackRepository studioTrackRepository, UserRepository userReposiotry, SoundBankRepository soundBankReposiotry, S3Service s3Service) {
        this.recordReposiotry = recordReposiotry;
        this.trackReposiotry = trackReposiotry;
        this.studioReposiotry = studioReposiotry;
        this.studioTrackRepository = studioTrackRepository;
        this.userReposiotry = userReposiotry;
        this.soundBankReposiotry = soundBankReposiotry;

        this.s3Service = s3Service;
    }

    public studioResponseDto getStudioList(Integer userId) {
        Optional<User> optionalUser = userReposiotry.findById(userId);
        User user = checkElementException(optionalUser, "User not found");

        List<Studio> studioList = studioReposiotry.findByUser(user);
        List<studioDto> studioDtoList = new ArrayList<>();
        if (!studioList.isEmpty()) {
            for (Studio studio : studioList) {
                studioDto dto = getStudioDto(studio.getId());
                studioDtoList.add(dto);
            }
        }
        return new studioResponseDto(studioDtoList);
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

        deleteWorkList(userId,studioId);
        studioReposiotry.deleteById(studioId);
    }

    public workListResponseDto getWorkList(Integer studioId) {
        // 1. studioId를 통해 해당하는 트랙을 찾는다. -> 스튜디오트랙테이블이용
        Optional<Studio> optionalStudio = studioReposiotry.findById(studioId);
        Studio studio = checkElementException(optionalStudio, "Studio not found");

        List<StudioTrack> studioTrackList = studioTrackRepository.findByStudio(studio);
        List<workResponseDto> trackList = new ArrayList<>();
        if (!studioTrackList.isEmpty()) {
            for (StudioTrack studioTrack : studioTrackList) {
                workResponseDto dto = getWorkResponseDto(studioId,studioTrack.getTrack().getId());
                trackList.add(dto);
            }
        }
        return new workListResponseDto(studio.getName(), trackList);

    }

    @Transactional
    public void updateWorkList(Integer studioId, workListUpdateDto workListUpdateDto){
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
    public void deleteWorkList(Integer userId,Integer studioId){ // 사운드뱅크 삭제 위해 userId필요
        // 스튜디오 트랙 리스트 호출

        Optional<Studio> optionalStudio = studioReposiotry.findById(studioId);
        Studio studio = checkElementException(optionalStudio, "Studio not found");
        List<StudioTrack> studioTrackList = studioTrackRepository.findByStudio(studio);
        List<Integer> trackIdList = new ArrayList<>();

        if (!studioTrackList.isEmpty()) {
            for (StudioTrack studioTrack : studioTrackList) {
                trackIdList.add(studioTrack.getTrack().getId());
            }
        }

        // 스튜디오 트랙 리스트 삭제
        if (!studioTrackList.isEmpty()) studioTrackRepository.deleteAll(studioTrackList);

        // 사운드 뱅크에 없는 트랙 삭제하기
        if (!trackIdList.isEmpty()) {
            for (Integer trackId : trackIdList) {
                SoundBankId soundBankId = new SoundBankId(
                        userId,
                        trackId
                );
                Optional<SoundBank> optionalSoundBank = soundBankReposiotry.findById(soundBankId);
                if (optionalSoundBank.isEmpty()) {
                    trackReposiotry.deleteById(trackId);
                }
            }
        }

    }
    @Transactional
    public workResponseDto createWork(Integer userId, Integer studioId, workCreateDto workCreateDto) {
        System.out.println(workCreateDto.getInstrumentId());
        System.out.println(workCreateDto.getOrder());
        System.out.println(workCreateDto.getRecordId());
        // 유저 엔티티 불러오기
        Optional<User> optionalUser = userReposiotry.findById(userId);
        User user = checkElementException(optionalUser, "User not found");

        // 작업실 엔티티 불러오기
        Optional<Studio> optionalStudio = studioReposiotry.findById(studioId);
        Studio studio = checkElementException(optionalStudio, "Studio not found");

        //악기이넘사용
        Instrument instrument = Instrument.values()[workCreateDto.getInstrumentId()];
        System.out.println(instrument.name());
        // 트랙 이름 자동 생성
        String trackName = "Track_" + System.currentTimeMillis();
        System.out.println(trackName);
        // 어떻게 생성해야할지 모르겠음

        // 레코드 엔티티 불러오기
        Optional<Record> optionalRecord = recordReposiotry.findById(workCreateDto.getRecordId());
        Record record;
        if (optionalRecord.isPresent()) {
            record = optionalRecord.get();
        }
        else{
            record = new Record(
                    0,
                    s3Service.generatePresignedUrl("레코드 파일이름 어떻게 저장할지 정해야함")
            );
           record = recordReposiotry.save(record);
        }


        //S3이용해 트랙Id불러오기
        String filePath = "fjalkfjlkdfjalfjalf";
                //s3Service.generatePresignedUrl("트랙이름 방식 어떻게 할 것인가요?");
        //????
        /// //////////

        // 트랙 엔티티 생성하기
        Track track = new Track(
                0,
                user,
                instrument, //인스트러먼트 이넘이라 모르겠으
                record,
                trackName,   // dto에서 네임을 안받은듯, 먼저 백에서 네임 자동생성 방식인ㄷ ㅡㅅ
                filePath
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

        return getWorkResponseDto(studio.getId(), track.getId());
    }

/// /////////////////////////////////////////////////////////////////////////////////////////////////////

    // 트랙ID에 해당하는 트랙 반환
    public trackResponseDto getTrack(Integer userId, Integer trackId){
        trackDto trackDto = getTrackDto(trackId);
        return new trackResponseDto(trackDto);
    }
    @Transactional
    public void updateTrack(Integer studioId,Integer trackId, trackUpdateDto trackUpdateDto){
        Optional<Track> optionalTrack = trackReposiotry.findById(trackId);
        Track track = checkElementException(optionalTrack, "Track not found");
        Optional<Studio> optionalStudio = studioReposiotry.findById(studioId);
        Studio studio = checkElementException(optionalStudio, "Studio not found");
        Optional<StudioTrack> optionalStudioTrack = studioTrackRepository.findByStudioAndTrack(studio, track);
        StudioTrack studioTrack = checkElementException(optionalStudioTrack, "StudioTrack not found");

        track.setName(trackUpdateDto.getTrackName());
        trackReposiotry.save(track);
        studioTrack.setOrder(trackUpdateDto.getOrder());
        studioTrackRepository.save(studioTrack);


    }

    // 레코드 반환
    public recordResponseDto getRecord(Integer recordId){
        recordDto dto = getRecordDto(recordId); //레코드 dto호출
        return new recordResponseDto(dto);
    }

    // 레코드 저장
    private recordDto getRecordDto(Integer recordId){
        Optional<Record> optionalRecord = recordReposiotry.findById(recordId);
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
                track.getName(),
                track.getRecord().getId()
        );
    }

    private studioDto getStudioDto(Integer studioId){
        Optional<Studio> optionalStudio = studioReposiotry.findById(studioId);
        Studio studio = checkElementException(optionalStudio, "Studio not found");
        List<StudioTrack> StudioTrackList = studioTrackRepository.findByStudio(studio);
        List<String> instrumentList = new ArrayList<String>();

        if(!StudioTrackList.isEmpty()) {
            for (StudioTrack studioTrack : StudioTrackList) {
                Track track = studioTrack.getTrack();
                instrumentList.add(track.getInstrument().name());//
            }
        }
        return new studioDto(
                studio.getId(),
                studio.getUser().getId(),
                studioId,
                studio.getName(),
                instrumentList,
                null    // 불러오는 방식 모르겠음
        );
    }

    public workResponseDto getWorkResponseDto(Integer studioId, Integer trackId){

        trackDto trackDto = getTrackDto(trackId);// 트랙 dto호출
        recordDto recordDto = getRecordDto(trackDto.getRecordId());//레코드 dto호출

        StudioTrackId studioTrackId = new StudioTrackId(studioId, trackId);
        Optional<StudioTrack> optionalStudioTrack = studioTrackRepository.findById(studioTrackId);
        StudioTrack studioTrack = checkElementException(optionalStudioTrack, "StudioTrack not found");

        return new workResponseDto(
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



//    public void deleteSoundBankList(Integer userId) { // 삭제시 트랙도 삭제
//        // 스튜디오트랙 리스트 가져오기
//        Optional<User> optionalUser = userReposiotry.findById(userId);
//        User user = checkElementException(optionalUser, "User not found");
//        List<SoundBank> soundBankList = soundBankReposiotry.findByUser(user);
//
//        //  해당 사운드뱅크 안의 트랙 삭제후 해당 뱅크 삭제 삭제하기
//        if (soundBankList.size() > 0) {
//            for (SoundBank soundBank : soundBankList) {
//                trackReposiotry.delete(soundBank.getTrack());
//                soundBankReposiotry.delete(soundBank);
//            }
//        }
//    }


//        public void deleteStudioList(Integer userId){ // 유저의 스튜디오 전체 삭제
//            // 스튜디오 리스트 가져오기
//            Optional<User> optionalUser = userReposiotry.findById(userId);
//            User user = checkElementException(optionalUser, "User not found");
//            List<Studio> studioList = studioReposiotry.findByUser(user);
//
//            //  해당 사운드뱅크 안의 트랙 삭제후 해당 뱅크 삭제 삭제하기
//            if (studioList.size() > 0) {
//                for (Studio studio : studioList) {
//                    deleteStudio(userId, studio.getId());
//                }
//            }
//        }
//    }





}

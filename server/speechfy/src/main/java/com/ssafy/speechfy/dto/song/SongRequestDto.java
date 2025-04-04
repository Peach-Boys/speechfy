package com.ssafy.speechfy.dto.song;

import com.ssafy.speechfy.dto.work.track.TrackDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SongRequestDto {
    private String title;
    private String songSrc;      // null이면 trackList를 이용해 음악 생성
    private String imgSrc;
    private List<TrackDto> trackList;
    private String gerne;        // JSON 키에 따라 "gerne"로 사용 (필요하다면 "genre"로 수정 가능)
    private String mood;
}

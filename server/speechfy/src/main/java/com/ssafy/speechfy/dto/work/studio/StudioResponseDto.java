package com.ssafy.speechfy.dto.work.studio;


import com.ssafy.speechfy.dto.work.track.TrackResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudioResponseDto {
    private Integer studioId;
    private String studioName;
    private List<TrackResponseDto> trackList;
}

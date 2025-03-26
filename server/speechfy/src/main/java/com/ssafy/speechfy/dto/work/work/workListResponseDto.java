package com.ssafy.speechfy.dto.work.work;

import com.ssafy.speechfy.dto.work.common.workDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class workListResponseDto {
    private String studioName;
    private List<workResponseDto> trackList;
}

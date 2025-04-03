package com.ssafy.speechfy.dto.work.studio;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudioListResponseDto {
    private List<StudioSimpleDto> workList;
}

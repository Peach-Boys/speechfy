package com.ssafy.speechfy.dto.work.studio;

import com.ssafy.speechfy.dto.work.common.studioDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class studioResponseDto {
    private List<studioDto> workList;
}

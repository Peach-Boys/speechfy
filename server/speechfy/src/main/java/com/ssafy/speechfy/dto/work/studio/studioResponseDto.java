package com.ssafy.speechfy.dto.work.studio;

import com.ssafy.speechfy.dto.work.work.workListResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class studioResponseDto {
    Integer studioId;
    String studioName;
    workListResponseDto workListResponse;
}

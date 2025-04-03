package com.ssafy.speechfy.dto.work.track;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrackResponseDto { // 프라사인드 반환을 위한 DTO
    private TrackDto track;
    private RecordDto record;
}

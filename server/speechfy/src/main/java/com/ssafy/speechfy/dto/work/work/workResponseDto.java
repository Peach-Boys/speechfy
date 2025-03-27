package com.ssafy.speechfy.dto.work.work;


import com.ssafy.speechfy.dto.work.record.recordResponseDto;
import com.ssafy.speechfy.dto.work.track.trackResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class workResponseDto {
    private Integer order;
    private trackResponseDto track;
    private recordResponseDto record;
}

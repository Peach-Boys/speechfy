package com.ssafy.speechfy.dto.work.work;

import com.ssafy.speechfy.dto.work.common.recordDto;
import com.ssafy.speechfy.dto.work.common.trackDto;
import com.ssafy.speechfy.dto.work.common.workDto;
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
    private trackDto track;
    private recordDto record;
}

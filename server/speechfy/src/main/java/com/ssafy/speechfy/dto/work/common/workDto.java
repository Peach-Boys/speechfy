package com.ssafy.speechfy.dto.work.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public  class workDto {
    private Integer workId;
    private trackDto track;
    private recordDto record;
}
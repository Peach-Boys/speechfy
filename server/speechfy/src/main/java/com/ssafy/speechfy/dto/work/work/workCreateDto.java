package com.ssafy.speechfy.dto.work.work;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class workCreateDto {
    private Integer instrumentId;
    private Integer recordId;
    private Integer order;
}

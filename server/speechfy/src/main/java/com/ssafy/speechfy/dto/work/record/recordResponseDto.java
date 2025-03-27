package com.ssafy.speechfy.dto.work.record;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class recordResponseDto {
    private Integer recordId;
    private String recordPresignedUrl;
}

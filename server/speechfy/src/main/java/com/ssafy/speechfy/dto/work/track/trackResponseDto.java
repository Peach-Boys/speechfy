package com.ssafy.speechfy.dto.work.track;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class trackResponseDto { // 프라사인드 반환을 위한 DTO
    private Integer trackId;
    private String instrumentName;
    private String trackPresignedUrl;
    private String trackName;
    private Integer recordId;

}

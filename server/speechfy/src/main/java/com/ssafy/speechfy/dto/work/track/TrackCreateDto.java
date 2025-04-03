package com.ssafy.speechfy.dto.work.track;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrackCreateDto {
    private Integer instrumentId;
    private Integer order;
    private Integer recordId;
    private String trackName;
    private String trackUUID;
    private String recordUUID;
}

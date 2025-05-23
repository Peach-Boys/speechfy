package com.ssafy.speechfy.dto.work.track;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrackCreateDto {
    private String instrument;
    private Integer order;
    private Integer recordId;
    private Integer trackId;
    private String trackName;
    private String trackUUID;
    private String recordUUID;
}

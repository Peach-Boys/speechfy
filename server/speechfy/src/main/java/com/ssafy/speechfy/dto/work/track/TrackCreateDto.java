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
    @NotBlank(message = "Instrument는 필수 입력 항목입니다.")
    private String instrument;
    private Integer order;
    @NotBlank(message = "recordId는 필수 입력 항목입니다.")
    private Integer recordId;
    private Integer trackId;
    private String trackName;
    @NotBlank(message = "tracjUUID는 필수 입력 항목입니다.")
    private String trackUUID;
    @NotBlank(message = "recordUUID는 필수 입력 항목입니다.")
    private String recordUUID;
}

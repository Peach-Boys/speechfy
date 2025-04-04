package com.ssafy.speechfy.dto.song;

import lombok.*;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SongShareResponseDto {
    private String songName;
    private String imageCloudFrontUrl;
    private String songCloudFrontUrl;



}
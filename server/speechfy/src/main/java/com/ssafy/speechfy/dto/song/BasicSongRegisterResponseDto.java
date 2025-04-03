package com.ssafy.speechfy.dto.song;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BasicSongRegisterResponseDto {
    private Integer basicSongId;
    private Integer userId;
    private Integer studioId;
    private Integer viewCount;
    private Integer likesCount;
    private String mood;
    private String genre;
    private String title;
    private boolean AIUsed;
}

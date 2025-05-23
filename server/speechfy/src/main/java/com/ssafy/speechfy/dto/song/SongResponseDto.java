package com.ssafy.speechfy.dto.song;

import lombok.*;

import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SongResponseDto {
    private Integer songId;
    private Integer userId;
    private String title;
    private String songPresignedUrl;
    private Integer viewCount;
    private Integer likesCount;
    private String imagePresignedUrl;
    private String genre;
    private String mood;
    private boolean AIUsed;
    private List<String> instruments;
}

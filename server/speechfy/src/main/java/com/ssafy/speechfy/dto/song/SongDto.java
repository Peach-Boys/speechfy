package com.ssafy.speechfy.dto.song;

import lombok.*;

import java.net.URL;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SongDto {
    private Integer songId;
    private Integer userId;
    private String songUrl;
    private Integer viewCount;
    private Integer likesCount;
    private String imageUrl;
    private String genre;
    private String mood;
    private boolean isAIUsed;
}

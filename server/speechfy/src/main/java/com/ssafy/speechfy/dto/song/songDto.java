package com.ssafy.speechfy.dto.song;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class songDto {
    private Integer songId;
    private Integer userId;
    private String songUrl;
    private Integer viewCount;
    private Integer likesCount;
    private String imageUrl;
    private String genre;
    private String mood;
}

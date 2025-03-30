package com.ssafy.speechfy.dto.song;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class songResponseDto {
    private Integer songId;
    private Integer userId;
    private String songPresignedUrl;
    private Integer viewCount;
    private Integer likes;
    private String imagePresignedUrl;
    private String genre;
    private String mood;

}

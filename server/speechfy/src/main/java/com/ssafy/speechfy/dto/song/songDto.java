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
public class songDto {
    private Integer songId;
    private Integer userId;
    private String songUrl;
    private Integer viewCount;
    private Integer likes;
    private String imageUrl;
    private String genre;
    private List<String> mood;
}

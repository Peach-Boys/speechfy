package com.ssafy.speechfy.dto.song;

import com.ssafy.speechfy.enums.GenreType;
import com.ssafy.speechfy.enums.MoodType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AISongRegisterResponseDto {
    private Integer aiSongId;
    private Integer userId;
    private Integer studioId;
    private Integer viewCount;
    private Integer likesCount;
    private MoodType mood;
    private GenreType genre;
    private String name;
    private boolean isAIUsed;
    private List<String> instruments;
    private String signedUrl;
}
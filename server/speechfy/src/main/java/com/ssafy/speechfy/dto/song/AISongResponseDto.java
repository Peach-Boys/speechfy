package com.ssafy.speechfy.dto.song;

import com.ssafy.speechfy.enums.GenreType;
import com.ssafy.speechfy.enums.MoodType;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AISongResponseDto {
    private Integer aiSongId;
    private Integer userId;
    private Integer studioId;
    private Integer viewCount;
    private Integer likesCount;
    private MoodType mood;
    private GenreType genre;
    private String name;
    private boolean isAIUsed;
}

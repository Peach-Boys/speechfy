package com.ssafy.speechfy.dto.song;

import com.ssafy.speechfy.enums.GenreType;
import com.ssafy.speechfy.enums.MoodType;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AISongRegisterRequestDto {
    private String aiSongFilePath;
    private MoodType mood;
    private GenreType genre;
    private String name;
    private String instrumentsString;
}

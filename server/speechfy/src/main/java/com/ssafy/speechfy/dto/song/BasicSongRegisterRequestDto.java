package com.ssafy.speechfy.dto.song;

import com.ssafy.speechfy.enums.GenreType;
import com.ssafy.speechfy.enums.MoodType;
import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BasicSongRegisterRequestDto {
    private String basicSongFilePath;
    private MoodType mood;
    private GenreType genre;
    private String name;
    private List<String> instruments;
}

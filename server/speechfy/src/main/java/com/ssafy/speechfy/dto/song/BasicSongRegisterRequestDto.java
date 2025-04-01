package com.ssafy.speechfy.dto.song;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BasicSongRegisterRequestDto {
    private String basicSongFilePath;
    private String mood;
    private String genre;
    private String name;
}

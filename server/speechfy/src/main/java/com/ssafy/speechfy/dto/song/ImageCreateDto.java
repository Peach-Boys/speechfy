package com.ssafy.speechfy.dto.song;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ImageCreateDto {
    private String title;
    private String mood;
    private String genre;
}

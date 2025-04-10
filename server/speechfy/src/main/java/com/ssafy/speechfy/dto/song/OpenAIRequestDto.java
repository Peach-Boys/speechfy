package com.ssafy.speechfy.dto.song;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OpenAIRequestDto {
    private String model;
    private String prompt;
    private int n;
    private String size;
}
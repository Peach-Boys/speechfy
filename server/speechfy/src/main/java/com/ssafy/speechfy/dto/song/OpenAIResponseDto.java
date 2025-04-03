package com.ssafy.speechfy.dto.song;

import lombok.Data;
import java.util.List;

@Data
public class OpenAIResponseDto {
    private List<ImageData> data;

    @Data
    public static class ImageData {
        private String url;
    }
}
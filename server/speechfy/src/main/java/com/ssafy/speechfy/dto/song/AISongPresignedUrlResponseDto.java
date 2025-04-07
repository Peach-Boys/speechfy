package com.ssafy.speechfy.dto.song;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AISongPresignedUrlResponseDto {
    private String aiSongPresignedUrl;
    private String aiSongFilePath;
}

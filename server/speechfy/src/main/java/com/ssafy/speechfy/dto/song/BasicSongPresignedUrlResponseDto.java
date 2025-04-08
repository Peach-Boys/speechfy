package com.ssafy.speechfy.dto.song;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BasicSongPresignedUrlResponseDto {
    private String basicSongPresignedUrl;
    private String basicSongFilePath;
}

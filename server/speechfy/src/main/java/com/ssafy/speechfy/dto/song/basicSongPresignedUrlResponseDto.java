package com.ssafy.speechfy.dto.song;

import lombok.*;

import java.net.URL;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class basicSongPresignedUrlResponseDto {
    private URL basicSongPresignedUrl;
    private String basicSongUUID;
}

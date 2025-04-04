package com.ssafy.speechfy.dto.song;

import lombok.*;

import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SongListResponseDto {
    private List<SongResponseDto> songList;
}

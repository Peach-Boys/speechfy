package com.ssafy.speechfy.dto.work.studio;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudioSimpleDto {
    private Integer studioId;
    private Integer userId;
    private String studioName;
    private List<String> trackInfo;
    private String modifiedAt;
}

package com.ssafy.speechfy.dto.work.common;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class studioDto {
    private Integer workId;
    private Integer userId;
    private Integer studioId;
    private String name;
    private List<String> trackInfo;
    private String modifiedAt;
}

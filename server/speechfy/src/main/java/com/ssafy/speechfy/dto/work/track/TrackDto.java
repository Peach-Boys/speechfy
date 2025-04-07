package com.ssafy.speechfy.dto.work.track;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrackDto {
   private Integer trackId;
   private String instrumentName;
   private String trackCloudFrontUrl;
   private String trackName;
   private Integer recordId;
   private Integer order;
}
package com.ssafy.speechfy.dto.work.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class trackDto {
   private Integer trackId;
   private String instrumentName;
   private String trackUrl;
   private String trackName;
   private Integer recordId;
}
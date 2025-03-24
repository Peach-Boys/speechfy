package com.ssafy.speechfy.dto.work;

import com.ssafy.speechfy.dto.work.common.trackDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class workListUpdateDto {
    private List<trackUpdateDto> updateList;
}

package com.ssafy.speechfy.dto.work;

import com.ssafy.speechfy.dto.work.common.trackDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class trackUpdateDto {
    private int order;
    private trackDto track;

}

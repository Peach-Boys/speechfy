package com.ssafy.speechfy.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@EqualsAndHashCode
@NoArgsConstructor
@Setter
@Getter
public class SoundBankId implements Serializable {

    @Column(name = "user_id")
    private int userId;

    @Column(name = "track_id")
    private int trackId;

    public SoundBankId(int userId, int trackId) {
        this.userId = userId;
        this.trackId = trackId;
    }
}

package com.ssafy.speechfy.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@EqualsAndHashCode
@NoArgsConstructor
public class LikeId implements Serializable {

    @Column(name = "user_id")
    private int userId;

    @Column(name = "song_id")
    private int songId;

    public LikeId(int userId, int songId) {
        this.userId = userId;
        this.songId = songId;
    }
}

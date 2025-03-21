package com.ssafy.speechfy.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@EqualsAndHashCode
@NoArgsConstructor
public class StudioTrackId implements Serializable {

    @Column(name = "studio_id")
    private int studioId;

    @Column(name = "track_id")
    private int trackId;

    public StudioTrackId(int studioId, int trackId) {
        this.studioId = studioId;
        this.trackId = trackId;
    }
}

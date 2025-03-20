package com.ssafy.speechfy.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@EqualsAndHashCode
@NoArgsConstructor
public class SongImageId implements Serializable {

    @Column(name = "song_id")
    private String songId;

    @Column(name = "image_id")
    private String imageId;

    public SongImageId(String songId, String imageId) {
        this.songId = songId;
        this.imageId = imageId;
    }
}

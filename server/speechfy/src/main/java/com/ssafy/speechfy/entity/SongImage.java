package com.ssafy.speechfy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "song_image")
public class SongImage extends BaseEntity {

    @EmbeddedId
    private SongImageId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("songId")
    @JoinColumn(name = "song_id")
    private Song song;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("imageId")
    @JoinColumn(name = "image_id")
    private Image image;
}

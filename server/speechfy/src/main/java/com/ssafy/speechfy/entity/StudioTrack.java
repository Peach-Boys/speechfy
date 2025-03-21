package com.ssafy.speechfy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "studio_track")
public class StudioTrack extends BaseEntity {

    @EmbeddedId
    private StudioTrackId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("studioId")
    @JoinColumn(name = "studio_id")
    private Studio studio;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("trackId")
    @JoinColumn(name = "track_id")
    private Track track;

    @Column(name = "`order`")
    private int order;
}

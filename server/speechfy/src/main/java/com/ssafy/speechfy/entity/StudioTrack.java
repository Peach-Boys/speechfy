package com.ssafy.speechfy.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "studio_track")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
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

    @Column(name = "order")
    private int order;
}
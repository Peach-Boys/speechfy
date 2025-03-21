package com.ssafy.speechfy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "soundbank")
public class SoundBank extends BaseEntity {

    @EmbeddedId
    private SoundBankId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("trackId")
    @JoinColumn(name = "track_id")
    private Track track;

}

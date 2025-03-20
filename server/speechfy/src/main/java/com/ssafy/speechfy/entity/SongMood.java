package com.ssafy.speechfy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "song_mood")
public class SongMood extends BaseEntity {

    @EmbeddedId
    private SongMoodId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("songId")
    @JoinColumn(name = "song_id")
    private Song song;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("moodId")
    @JoinColumn(name = "mood_id")
    private Mood mood;
}

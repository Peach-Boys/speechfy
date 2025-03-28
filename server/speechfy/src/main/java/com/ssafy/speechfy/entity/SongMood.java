package com.ssafy.speechfy.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "song_mood")
@Getter @Setter
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

package com.ssafy.speechfy.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@EqualsAndHashCode
@NoArgsConstructor
public class SongMoodId implements Serializable {

    @Column(name = "song_id")
    private int songId;

    @Column(name = "mood_id")
    private int moodId;

    public SongMoodId(int songId, int moodId) {
        this.songId = songId;
        this.moodId = moodId;
    }
}

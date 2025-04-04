package com.ssafy.speechfy.entity;

import com.ssafy.speechfy.enums.GenreType;
import com.ssafy.speechfy.enums.InstrumentType;
import com.ssafy.speechfy.enums.MoodType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Setter
@Getter
@SuperBuilder
@Table(name="song")
@NoArgsConstructor
@AllArgsConstructor
public class Song extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "studio_id")
    private Studio studio;

    @Enumerated(EnumType.STRING)
    private MoodType moodType;

    @Enumerated(EnumType.STRING)
    private GenreType genreType;

    @Column(name = "view_count")
    private int viewCount;

    @Column(name = "likes_count")
    private int likesCount;

    @Column(name = "image_path")
    private String imagePath;

    @Column(name = "name")
    private String name;

    @Column(name = "file_path")
    private String filePath;

    @OneToMany(mappedBy = "song", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Like> likes;

    @Column(name = "is_ai_used")
    private Boolean isAIUsed;

    @ElementCollection(targetClass = InstrumentType.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "song_instruments", joinColumns = @JoinColumn(name = "song_id"))
    @Column(name = "instrument")
    private Set<InstrumentType> instruments = new HashSet<>();
}

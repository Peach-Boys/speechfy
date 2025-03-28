package com.ssafy.speechfy.entity;

import com.ssafy.speechfy.enums.GenreType;
import com.ssafy.speechfy.enums.MoodType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter @Getter
@Table(name="song")
@NoArgsConstructor
@AllArgsConstructor
public class Song extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

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

    @Column(name = "likes")
    private int likes;

    @Column(name = "image_path")
    private String imagePath;

    @Column(name = "name")
    private String name;

    @Column(name = "file_path")
    private String filePath;
}

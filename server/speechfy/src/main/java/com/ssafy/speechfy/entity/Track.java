package com.ssafy.speechfy.entity;

import com.ssafy.speechfy.enums.InstrumentType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name="track")
@NoArgsConstructor
@AllArgsConstructor
public class Track extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private InstrumentType instrumentType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "record_id")
    private Record record;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "studio_id")
    private Studio studio;

    @Column(name = "name")
    private String name;

    @Column(name = "file_path")
    private String filePath;

    @Column(name = "`order`") // 초기값 1로 하기로
    private int order;

    public Track(User user, InstrumentType instrumentType, Record record, Studio studio, String name, String filePath, int order) {
        this.user = user;
        this.instrumentType = instrumentType;
        this.record = record;
        this.studio = studio;
        this.name = name;
        this.filePath = filePath;
        this.order = order;
    }
}

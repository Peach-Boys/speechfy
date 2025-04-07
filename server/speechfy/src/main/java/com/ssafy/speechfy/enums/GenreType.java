package com.ssafy.speechfy.enums;

public enum GenreType {
    POP("팝", "Pop"),
    JAZZ("재즈", "Jazz"),
    HIPHOP("힙합", "Hip-hop"),
    ELECTRONIC("일렉트로닉", "Electronic"),
    CLASSICAL("클래식", "Classical"),
    BALLAD("발라드", "Ballad"),
    DANCE("댄스", "Dance"),
    INDIE("인디", "Indie"),
    JPOP("제이팝", "J-Pop");

    private final String korean;
    private final String english;

    GenreType(String korean, String english) {
        this.korean = korean;
        this.english = english;
    }

    public String getKorean() {
        return korean;
    }

    public String getEnglish() {
        return english;
    }
}
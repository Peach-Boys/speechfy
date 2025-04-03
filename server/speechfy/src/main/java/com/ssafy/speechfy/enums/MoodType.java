package com.ssafy.speechfy.enums;

public enum MoodType {
    DREAMY("몽환적인", "Dreamy"),
    SAD("우울한", "Sad"),
    WARM("따뜻한", "Warm"),
    URBAN("도시적인", "Urban"),
    ENERGETIC("에너지넘치는", "Energetic"),
    ROMANTIC("낭만적인", "Romantic"),
    SIMPLE("심플한", "Simple"),
    MODERN("모던한", "Modern"),
    SENSITIVE("감성적인", "Sensitive"),
    VINTAGE("빈티지한", "Vintage"),
    SENSUAL("감각적인", "Sensual"),
    LYRICAL("서정적인", "Lyrical"),
    GROOVY("그루비한", "Groovy"),
    MYSTERIOUS("신비로운", "Mysterious"),
    RICH("풍부한", "Rich"),
    REFRESHING("청량한", "Refreshing");

    private final String korean;
    private final String english;

    MoodType(String korean, String english) {
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
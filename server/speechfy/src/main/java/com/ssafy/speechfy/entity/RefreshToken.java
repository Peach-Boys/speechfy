package com.ssafy.speechfy.entity;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.Indexed;

@Getter
@NoArgsConstructor
@RedisHash(value = "refreshToken", timeToLive = 60*60*6)
public class RefreshToken {

    @Id
    @Indexed
    private String jwtRefreshToken;

    private String authKey;

    @TimeToLive
    private long ttl;

    @Builder
    public RefreshToken(String jwtRefreshToken, String authKey, long ttl) {
        this.jwtRefreshToken = jwtRefreshToken;
        this.authKey = authKey;
        this.ttl = 1000L*60*60*6;
    }

}

package com.ssafy.speechfy.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Date;

@Service
public class S3Service {

    @Autowired
    private AmazonS3 amazonS3Client;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    @Value("${aws.cloudfront.domain}")
    private String cloudFrontDomain;

    private static final long EXPIRATION_TIME_MILLIS = 10 * 60 * 1000;

    public URL generatePresignedUrl(String ObjectKey) {
        // URL 만료 시간 설정 (10분으로 설정)
        Date expiration = new Date(System.currentTimeMillis() + EXPIRATION_TIME_MILLIS);

        // Presigned URL 생성 요청
        GeneratePresignedUrlRequest generatePresignedUrlRequest =
                new GeneratePresignedUrlRequest(bucketName, ObjectKey)
                        .withMethod(HttpMethod.PUT) // PUT 메서드로 설정 (파일 업로드)
                        .withExpiration(expiration);

        // Presigned URL 반환
        return amazonS3Client.generatePresignedUrl(generatePresignedUrlRequest);
    }

    public URL getCloudFrontUrl(String ObjectKey) throws MalformedURLException {
        String cloudFrontUrl = cloudFrontDomain + "/" + ObjectKey;
        return new URL(cloudFrontUrl);
    }
}

package com.ssafy.speechfy.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.time.Duration;


@Service
public class S3Service {

    private final S3Presigner presigner;
    private final String bucketName;

    public S3Service(
            @Value("${aws.s3.bucket-name}") String bucketName,  // 임의작성, 경로 수정 필요
            @Value("${aws.region}") String region,              // 임의작성, 경로 수정 필요
            @Value("${aws.access-key}") String accessKey,       // 임의작성, 경로 수정 필요
            @Value("${aws.secret-key}") String secretKey        // 임의작성, 경로 수정 필요
    ) {
        this.bucketName = bucketName;

        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(accessKey, secretKey);

        this.presigner = S3Presigner.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
                .build();
    }

    public String generatePresignedUrl(String fileName) {
        String objectKey = "uploads/" + fileName; // S3 내 저장될 경로 // 임의작성, 경로 수정 필요

        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(objectKey)
                .build();

        // 프리사인드 URL 생성
        PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(10)) // 10분간 유효
                .putObjectRequest(objectRequest)
                .build();

        PresignedPutObjectRequest presignedRequest = presigner.presignPutObject(presignRequest);

        return presignedRequest.url().toString(); // 생성된 URL 반환
    }

}

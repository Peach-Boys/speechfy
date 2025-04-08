package com.ssafy.speechfy.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;

@Service
public class S3Service {

    private final S3Client s3Client;
    private final S3Presigner s3Presigner;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    @Value("${aws.cloudfront.domain}")
    private String cloudFrontDomain;

    private static final Duration PRESIGNED_URL_EXPIRATION = Duration.ofMinutes(10);

    public S3Service(S3Client s3Client, S3Presigner s3Presigner) {
        this.s3Client = s3Client;
        this.s3Presigner = s3Presigner;
    }

    public URL generatePresignedUrl(String objectKey) {
        PresignedPutObjectRequest presignedRequest = s3Presigner.presignPutObject(builder -> builder
                .signatureDuration(PRESIGNED_URL_EXPIRATION)
                .putObjectRequest(req -> req
                        .bucket(bucketName)
                        .key(objectKey)
                )
        );
        return presignedRequest.url();
    }

    public URL getCloudFrontUrl(String objectKey) throws MalformedURLException {
        String url = cloudFrontDomain + "/" + objectKey;
        return new URL(url);
    }

    public void uploadImageFromUrl(String imageUrl, String objectKey) {
        try {
            URL url = new URL(imageUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.connect();

            int contentLength = connection.getContentLength();
            String contentType = connection.getContentType();

            System.out.println("Content-Length: " + contentLength + ", Content-Type: " + contentType);

            try (InputStream inputStream = connection.getInputStream()) {
                PutObjectRequest putRequest = PutObjectRequest.builder()
                        .bucket(bucketName)
                        .key(objectKey)
                        .contentType(contentType)
                        .build();

                s3Client.putObject(putRequest, RequestBody.fromInputStream(inputStream, contentLength));
                System.out.println("파일 업로드 완료");
            }
        } catch (IOException e) {
            System.err.println("이미지 업로드 중 오류 발생: " + e.getMessage());
        }
    }

    public void deleteFile(String objectKey) {
        try {
            s3Client.deleteObject(builder -> builder.bucket(bucketName).key(objectKey));
            System.out.println("파일 삭제 완료");
        } catch (Exception e) {
            System.err.println("파일 삭제 중 오류 발생: " + e.getMessage());
        }
    }
}

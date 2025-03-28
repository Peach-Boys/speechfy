package com.ssafy.speechfy.repository;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import com.ssafy.speechfy.service.S3Service;

import java.net.MalformedURLException;
import java.net.URL;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class S3ServiceTest {

    @Mock
    private AmazonS3 amazonS3Client;

    @InjectMocks
    private S3Service s3Service;

    private final String bucketName = "test-bucket";
    private final String cloudFrontDomain = "https://test.cloudfront.net";
    private final String objectKey = "songs/test.mp3";

    @BeforeEach
    void setUp() {
        // ReflectionTestUtils로 테스트할 필드 값 설정
        ReflectionTestUtils.setField(s3Service, "bucketName", bucketName);
        ReflectionTestUtils.setField(s3Service, "cloudFrontDomain", cloudFrontDomain);
    }

    @Test
    void testGeneratePresignedUrl() {
        // Mocking URL 반환 값
        URL fakeUrl = mock(URL.class);

        // amazonS3Client가 generatePresignedUrl 호출 시 fakeUrl을 반환하도록 설정
        when(amazonS3Client.generatePresignedUrl(any(GeneratePresignedUrlRequest.class)))
                .thenReturn(fakeUrl);

        // URL 생성 메서드 호출
        URL presignedUrl = s3Service.generatePresignedUrl(objectKey);

        // URL이 null이 아닌지 검증
        assertNotNull(presignedUrl);

        // generatePresignedUrl 메서드 호출 확인
        verify(amazonS3Client, times(1)).generatePresignedUrl(any(GeneratePresignedUrlRequest.class));
    }

    @Test
    void testGetCloudFrontUrl() throws MalformedURLException {
        String expectedUrl = cloudFrontDomain + "/" + objectKey;

        // 실제 CloudFront URL 생성 메서드 호출
        URL cloudFrontUrl = s3Service.getCloudFrontUrl(objectKey);

        // URL이 예상한 값과 일치하는지 확인
        assertEquals(expectedUrl, cloudFrontUrl.toString());
    }

}

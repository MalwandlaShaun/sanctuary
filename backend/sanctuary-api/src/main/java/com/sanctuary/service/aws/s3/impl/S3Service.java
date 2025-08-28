package com.sanctuary.service.aws.s3.impl;

import com.sanctuary.service.aws.s3.IS3Service;
import com.sanctuary.util.FileUtil;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.auth.credentials.EnvironmentVariableCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.ByteArrayInputStream;

@Service
public class S3Service implements IS3Service {

    protected S3Client s3Client;

    @Value("${aws.region}")
    protected String awsRegion;

    @Value("${aws.s3.region}")
    protected String s3Region;

    @Value("${aws.s3.bucket.name}")
    protected String s3BucketName;

    @Value("${spring.profiles.active}")
    protected String activeProfile;

    @PostConstruct
    protected void initAwsClients() {

        Region awss3Region = Region.of(s3Region);



        AwsCredentialsProvider credentialsProvider =
                "dev".equals(activeProfile)
                        ? EnvironmentVariableCredentialsProvider.create()
                        : DefaultCredentialsProvider.create();

        this.s3Client = S3Client.builder()
                .region(awss3Region)
                .credentialsProvider(credentialsProvider)
                .build();


    }


    @Override
    public String uploadFileToS3(String objectKey, String fileBase64) {



        String environmentPrefix = "dev".equals(activeProfile) ? "test/" : "prod/";
        String s3ObjectKey = environmentPrefix + objectKey;

        ByteArrayInputStream baos = FileUtil.convertBase64ToInputStream(fileBase64);

        byte[] fileData = baos.readAllBytes();

        System.out.println(
                "Uploading file to S3 as: " +
                        String.format("https://%s.s3.%s.amazonaws.com/%s", s3BucketName, s3Region.toLowerCase().replace("_", "-"), objectKey)
        );

        System.out.println("Region: " + s3Region);

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(s3BucketName)
                .key(s3ObjectKey)
                .build();

        PutObjectResponse response = s3Client.putObject(putObjectRequest, RequestBody.fromBytes(fileData));



        return String.format("https://%s.s3.%s.amazonaws.com/%s", s3BucketName, s3Region.toLowerCase().replace("_", "-"), s3ObjectKey);
    }
}
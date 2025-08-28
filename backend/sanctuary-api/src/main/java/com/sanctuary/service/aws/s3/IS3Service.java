package com.sanctuary.service.aws.s3;

public interface IS3Service {
    String uploadFileToS3(String objectKey, String fileBase64);
}

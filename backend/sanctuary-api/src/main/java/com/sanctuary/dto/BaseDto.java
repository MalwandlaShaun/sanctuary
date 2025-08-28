package com.sanctuary.dto;

import org.bson.types.ObjectId;

import java.time.LocalDateTime;


public class BaseDto {
    ObjectId id;

    LocalDateTime createdDate;

    LocalDateTime updatedDate;

}

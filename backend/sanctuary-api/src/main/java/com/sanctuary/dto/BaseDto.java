package com.sanctuary.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


import java.time.LocalDateTime;

@Getter
@Setter
public class BaseDto {

    protected String id;

    protected LocalDateTime createdDate;

    protected LocalDateTime updatedDate;

}

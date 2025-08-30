package com.sanctuary.dto.job.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateJob {

    String title;

    String description;

    String location;

    double hourlyRate;

    String duration;

    LocalDateTime jobDate;
}

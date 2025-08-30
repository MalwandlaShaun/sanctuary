package com.sanctuary.model.job;

import com.sanctuary.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "jobs")
public class Job {

    @Indexed
    User customer;

    @Indexed
    User worker;

    String title;

    String description;

    String location;

    double hourlyRate;

    String duration;

    LocalDateTime jobDate;
}

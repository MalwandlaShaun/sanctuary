package com.sanctuary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class SanctuaryApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(SanctuaryApiApplication.class, args);
    }

}

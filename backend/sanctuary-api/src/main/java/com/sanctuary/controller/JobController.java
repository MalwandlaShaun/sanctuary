package com.sanctuary.controller;


import com.sanctuary.dto.MessageResponse;
import com.sanctuary.dto.job.request.CreateJob;
import com.sanctuary.service.job.IJobService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/job")
@RequiredArgsConstructor
@Tag(name = "Job API", description = "Operations related to jobs")
public class JobController {

    IJobService jobService;

    @PostMapping("/create")
    public ResponseEntity<MessageResponse> createJob(@Valid @RequestBody CreateJob createJob) {
        jobService.createJob(createJob);

        return ResponseEntity.ok(new MessageResponse("Job created successfully"));
    }
}

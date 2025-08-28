package com.sanctuary.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController("worker")
@RequiredArgsConstructor
@Tag(name = "Worker API", description = "Operations related to workers")
public class WorkerController {

}

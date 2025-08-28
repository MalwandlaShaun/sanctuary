package com.sanctuary.controller;

import com.sanctuary.dto.MessageResponse;
import com.sanctuary.dto.customer.request.RegisterCustomer;
import com.sanctuary.service.customer.ICustomerService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor
@Tag(name = "Customer API", description = "Operations related to customers")
public class CustomerController {

    private final ICustomerService customerService;

    @PostMapping("/registration")
    public ResponseEntity<MessageResponse> registerCustomer(@Valid @RequestBody RegisterCustomer registerCustomer) {
        customerService.registerCustomer(registerCustomer);
        return ResponseEntity.ok(new MessageResponse("Customer registered successfully"));
    }
}
package com.sanctuary.controller;

import com.sanctuary.dto.AuthResponse;
import com.sanctuary.dto.LoginRequest;
import com.sanctuary.dto.MessageResponse;
import com.sanctuary.dto.customer.request.RegisterCustomer;
import com.sanctuary.service.customer.ICustomerService;
import com.sanctuary.service.user.IUserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Tag(name = "Auth API", description = "Operations related to authentication")
@RequiredArgsConstructor
public class AuthController {

    private final IUserService userService;

    private final ICustomerService customerService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid  @RequestBody LoginRequest request) {

        return ResponseEntity.ok(userService.login(request));
    }

    @PostMapping("/register/customer")
    public ResponseEntity<MessageResponse> register(@Valid @RequestBody RegisterCustomer request) {
        customerService.registerCustomer(request);
        return ResponseEntity.ok(new MessageResponse("Customer registration successful"));
    }

}
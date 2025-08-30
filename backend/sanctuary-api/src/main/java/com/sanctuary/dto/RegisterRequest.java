package com.sanctuary.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotEmpty(message = "Full name cannot be empty")
    private String fullName;

    @NotEmpty(message = "Password cannot be empty")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

    @NotEmpty(message = "email cannot be empty")
    private String email;

    @NotEmpty(message = "Mobile number cannot be empty")
    private String mobileNo;

    private String identityNo;
    private String passportNo;

    @NotEmpty(message = "Country cannot be empty")
    private String country;

    @NotEmpty(message = "Role cannot be empty")
    private String role;

}
package com.sanctuary.dto.customer.request;

import com.sanctuary.dto.RegisterRequest;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RegisterCustomer extends RegisterRequest {

    @NotEmpty(message = "Profile picture us required.")
    String profilePictureBase64;

    @NotEmpty(message = "Identity document picture is required.")
    String idBookPictureBase64;

}

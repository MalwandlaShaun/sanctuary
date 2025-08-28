package com.sanctuary.dto.customer.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class RegisterCustomer {

    @NotEmpty(message = "User id is required.")
    String userId;

    @NotEmpty(message = "Profile picture us required.")
    String profilePictureBase64;

    @NotEmpty(message = "Identity document picture is required.")
    String idBookPictureBase64;

}

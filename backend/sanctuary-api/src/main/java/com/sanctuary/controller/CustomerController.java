package com.sanctuary.controller;

import com.sanctuary.dto.MessageResponse;
import com.sanctuary.dto.customer.request.RegisterCustomer;
import com.sanctuary.service.customer.ICustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("customer")
@RequiredArgsConstructor
public class CustomerController {

    ICustomerService customerService;

    @PostMapping("complete/registration")
    public ResponseEntity<MessageResponse> registerCustomer(RegisterCustomer registerCustomer){
        customerService.registerCustomer(registerCustomer);

        return  ResponseEntity.ok(new MessageResponse("Customer registered successfully"));
    }
}

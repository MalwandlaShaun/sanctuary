package com.sanctuary.service.user;

import com.sanctuary.dto.AuthResponse;
import com.sanctuary.dto.LoginRequest;
import com.sanctuary.dto.RegisterRequest;


public interface IUserService {

    AuthResponse login(LoginRequest request);

    void createUser(RegisterRequest registerRequest);
}

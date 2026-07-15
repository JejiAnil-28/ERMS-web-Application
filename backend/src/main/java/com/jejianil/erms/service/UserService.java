package com.jejianil.erms.service;

import com.jejianil.erms.dto.request.LoginRequest;
import com.jejianil.erms.dto.request.RegisterRequest;
import com.jejianil.erms.dto.response.LoginResponse;
import com.jejianil.erms.dto.response.UserResponse;

public interface UserService {

    UserResponse register(RegisterRequest request);
    LoginResponse login(LoginRequest request);

}
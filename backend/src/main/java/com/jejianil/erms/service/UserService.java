package com.jejianil.erms.service;

import com.jejianil.erms.dto.request.RegisterRequest;
import com.jejianil.erms.dto.response.UserResponse;

public interface UserService {

    UserResponse register(RegisterRequest request);

}
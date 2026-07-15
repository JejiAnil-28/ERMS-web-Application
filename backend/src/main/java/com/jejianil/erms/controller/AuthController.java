package com.jejianil.erms.controller;

import com.jejianil.erms.dto.request.RegisterRequest;
import com.jejianil.erms.dto.response.UserResponse;
import com.jejianil.erms.payload.ApiResponse;
import com.jejianil.erms.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> register(
            @Valid @RequestBody RegisterRequest request) {

        UserResponse userResponse = userService.register(request);

        ApiResponse<UserResponse> response =
                new ApiResponse<>(
                        true,
                        "User registered successfully",
                        userResponse
                );

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
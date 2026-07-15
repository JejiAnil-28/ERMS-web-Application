package com.jejianil.erms.mapper;

import com.jejianil.erms.dto.response.UserResponse;
import com.jejianil.erms.entity.User;

public class UserMapper {

    public static UserResponse toResponse(User user){

        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().getRoleName()
        );

    }

}
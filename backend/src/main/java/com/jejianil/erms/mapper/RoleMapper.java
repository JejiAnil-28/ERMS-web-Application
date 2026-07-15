package com.jejianil.erms.mapper;

import com.jejianil.erms.dto.response.RoleResponse;
import com.jejianil.erms.entity.Role;

public class RoleMapper {

    public static RoleResponse toResponse(Role role) {

        return new RoleResponse(
                role.getId(),
                role.getRoleName(),
                role.getDescription()
        );
    }

}
package com.jejianil.erms.controller;

import com.jejianil.erms.dto.response.RoleResponse;
import com.jejianil.erms.entity.Role;
import com.jejianil.erms.payload.ApiResponse;
import com.jejianil.erms.service.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/roles")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<RoleResponse>>> getAllRoles() {

        List<RoleResponse> roles = roleService.getAllRoles();

        ApiResponse<List<RoleResponse>> response =
                new ApiResponse<>(
                        true,
                        "Roles fetched successfully",
                        roles
                );

        return ResponseEntity.ok(response);
    }

}
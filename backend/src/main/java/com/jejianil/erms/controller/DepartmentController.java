package com.jejianil.erms.controller;

import com.jejianil.erms.dto.request.DepartmentRequest;
import com.jejianil.erms.dto.response.DepartmentResponse;
import com.jejianil.erms.payload.ApiResponse;
import com.jejianil.erms.service.DepartmentService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(
            DepartmentService departmentService) {

        this.departmentService = departmentService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<DepartmentResponse>> createDepartment(

            @Valid
            @RequestBody
            DepartmentRequest request) {

        DepartmentResponse response =
                departmentService.createDepartment(request);

        return ResponseEntity.status(HttpStatus.CREATED)

                .body(

                        new ApiResponse<>(

                                true,

                                "Department created successfully",

                                response

                        )
                );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<DepartmentResponse>>> getAllDepartments() {

        List<DepartmentResponse> departments =
                departmentService.getAllDepartments();

        return ResponseEntity.ok(

                new ApiResponse<>(

                        true,

                        "Departments fetched successfully",

                        departments

                )
        );
    }

}
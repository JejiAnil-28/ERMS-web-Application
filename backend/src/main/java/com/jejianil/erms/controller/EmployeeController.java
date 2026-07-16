package com.jejianil.erms.controller;

import com.jejianil.erms.dto.request.EmployeeRequest;
import com.jejianil.erms.dto.response.EmployeeResponse;
import com.jejianil.erms.payload.ApiResponse;
import com.jejianil.erms.service.EmployeeService;

import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<EmployeeResponse>> createEmployee(
            @Valid @RequestBody EmployeeRequest request) {

        EmployeeResponse response =
                employeeService.createEmployee(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        new ApiResponse<>(
                                true,
                                "Employee created successfully",
                                response
                        )
                );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<EmployeeResponse>>> getAllEmployees() {

        List<EmployeeResponse> employees =
                employeeService.getAllEmployees();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Employees fetched successfully",
                        employees
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EmployeeResponse>> getEmployeeById(
            @PathVariable Long id) {

        EmployeeResponse response =
                employeeService.getEmployeeById(id);

        return ResponseEntity.ok(

                new ApiResponse<>(

                        true,

                        "Employee fetched successfully",

                        response
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EmployeeResponse>> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeRequest request) {

        EmployeeResponse response =
                employeeService.updateEmployee(id, request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Employee updated successfully",
                        response
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEmployee(
            @PathVariable Long id) {

        employeeService.deleteEmployee(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Employee deleted successfully",
                        null
                )
        );
    }

    @GetMapping("/page")
    public ResponseEntity<ApiResponse<Page<EmployeeResponse>>> getEmployees(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "5")
            int size,

            @RequestParam(defaultValue = "id")
            String sort,

            @RequestParam(defaultValue = "asc")
            String direction) {

        Page<EmployeeResponse> response =
                employeeService.getEmployees(
                        page,
                        size,
                        sort,
                        direction
                );

        return ResponseEntity.ok(

                new ApiResponse<>(

                        true,

                        "Employees fetched successfully",

                        response
                )
        );
    }

}

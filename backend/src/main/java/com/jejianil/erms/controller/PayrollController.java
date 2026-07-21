package com.jejianil.erms.controller;

import com.jejianil.erms.dto.request.PayrollRequest;
import com.jejianil.erms.dto.response.PayrollResponse;
import com.jejianil.erms.payload.ApiResponse;
import com.jejianil.erms.service.PayrollService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/payroll")
public class PayrollController {

    private final PayrollService payrollService;

    public PayrollController(PayrollService payrollService) {
        this.payrollService = payrollService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PayrollResponse>> createPayroll(
            @Valid @RequestBody PayrollRequest request) {

        PayrollResponse response =
                payrollService.createPayroll(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        new ApiResponse<>(
                                true,
                                "Payroll created successfully",
                                response
                        )
                );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<PayrollResponse>>> getAllPayrolls() {

        List<PayrollResponse> response =
                payrollService.getAllPayrolls();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Payrolls fetched successfully",
                        response
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PayrollResponse>> getPayrollById(
            @PathVariable Long id) {

        PayrollResponse response =
                payrollService.getPayrollById(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Payroll fetched successfully",
                        response
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PayrollResponse>> updatePayroll(
            @PathVariable Long id,
            @Valid @RequestBody PayrollRequest request) {

        PayrollResponse response =
                payrollService.updatePayroll(id, request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Payroll updated successfully",
                        response
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deletePayroll(
            @PathVariable Long id) {

        payrollService.deletePayroll(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Payroll deleted successfully",
                        null
                )
        );
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<ApiResponse<List<PayrollResponse>>> getPayrollByEmployee(
            @PathVariable Long employeeId) {

        List<PayrollResponse> response =
                payrollService.getPayrollByEmployee(employeeId);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Employee payroll fetched successfully",
                        response
                )
        );
    }

    @GetMapping("/month/{month}/{year}")
    public ResponseEntity<ApiResponse<List<PayrollResponse>>> getPayrollByMonth(
            @PathVariable Integer month,
            @PathVariable Integer year) {

        List<PayrollResponse> response =
                payrollService.getPayrollByMonth(month, year);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Monthly payroll fetched successfully",
                        response
                )
        );
    }

}
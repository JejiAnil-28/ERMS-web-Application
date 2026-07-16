package com.jejianil.erms.controller;

import com.jejianil.erms.dto.request.AttendanceRequest;
import com.jejianil.erms.dto.response.AttendanceResponse;
import com.jejianil.erms.payload.ApiResponse;
import com.jejianil.erms.service.AttendanceService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(
            AttendanceService attendanceService) {

        this.attendanceService = attendanceService;
    }

    @PostMapping("/check-in")
    public ResponseEntity<ApiResponse<AttendanceResponse>> checkIn(
            @Valid @RequestBody AttendanceRequest request) {

        AttendanceResponse response =
                attendanceService.checkIn(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(

                        new ApiResponse<>(

                                true,

                                "Check-in successful",

                                response
                        )

                );
    }

    @PostMapping("/check-out/{employeeId}")
    public ResponseEntity<ApiResponse<AttendanceResponse>> checkOut(
            @PathVariable Long employeeId) {

        AttendanceResponse response =
                attendanceService.checkOut(employeeId);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Check-out successful",
                        response
                )
        );
    }

}
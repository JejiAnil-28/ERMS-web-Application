package com.jejianil.erms.controller;

import com.jejianil.erms.dto.request.LeaveRequestDto;
import com.jejianil.erms.dto.response.LeaveResponse;
import com.jejianil.erms.payload.ApiResponse;
import com.jejianil.erms.service.LeaveService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/leaves")
public class LeaveController {

    private final LeaveService leaveService;

    public LeaveController(LeaveService leaveService) {
        this.leaveService = leaveService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<LeaveResponse>> applyLeave(
            @Valid @RequestBody LeaveRequestDto request) {

        LeaveResponse response =
                leaveService.applyLeave(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        new ApiResponse<>(
                                true,
                                "Leave applied successfully",
                                response
                        )
                );
    }

    @PutMapping("/{leaveId}/approve/{approverId}")
    public ResponseEntity<ApiResponse<LeaveResponse>> approveLeave(
            @PathVariable Long leaveId,
            @PathVariable Long approverId) {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Leave approved successfully",
                        leaveService.approveLeave(
                                leaveId,
                                approverId
                        )
                )
        );
    }

    @PutMapping("/{leaveId}/reject/{approverId}")
    public ResponseEntity<ApiResponse<LeaveResponse>> rejectLeave(
            @PathVariable Long leaveId,
            @PathVariable Long approverId) {

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Leave rejected successfully",
                        leaveService.rejectLeave(
                                leaveId,
                                approverId
                        )
                )
        );
    }
}
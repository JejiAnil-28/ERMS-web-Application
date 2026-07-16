package com.jejianil.erms.controller;

import com.jejianil.erms.dto.response.DashboardResponse;
import com.jejianil.erms.payload.ApiResponse;
import com.jejianil.erms.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(
            DashboardService dashboardService) {

        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<DashboardResponse>>
    getDashboardSummary() {

        DashboardResponse response =
                dashboardService.getDashboardSummary();

        return ResponseEntity.ok(

                new ApiResponse<>(

                        true,

                        "Dashboard summary fetched successfully",

                        response
                )

        );
    }
}
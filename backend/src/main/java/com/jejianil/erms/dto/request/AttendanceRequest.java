package com.jejianil.erms.dto.request;

import jakarta.validation.constraints.NotNull;

public class AttendanceRequest {

    @NotNull(message = "Employee Id is required")
    private Long employeeId;

    private String remarks;

    public AttendanceRequest() {
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}
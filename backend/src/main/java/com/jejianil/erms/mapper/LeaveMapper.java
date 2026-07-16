package com.jejianil.erms.mapper;

import com.jejianil.erms.dto.response.LeaveResponse;
import com.jejianil.erms.entity.LeaveRequest;

public class LeaveMapper {

    private LeaveMapper() {
    }

    public static LeaveResponse toResponse(LeaveRequest leave) {

        LeaveResponse response = new LeaveResponse();

        response.setId(leave.getId());

        response.setEmployeeCode(
                leave.getEmployee().getEmployeeCode()
        );

        response.setEmployeeName(
                leave.getEmployee().getFirstName() + " "
                        + leave.getEmployee().getLastName()
        );

        response.setLeaveType(leave.getLeaveType());
        response.setStartDate(leave.getStartDate());
        response.setEndDate(leave.getEndDate());
        response.setReason(leave.getReason());
        response.setStatus(leave.getStatus());

        if (leave.getApprovedBy() != null) {
            response.setApprovedBy(
                    leave.getApprovedBy().getUsername()
            );
        }

        response.setApprovedAt(leave.getApprovedAt());

        return response;
    }
}
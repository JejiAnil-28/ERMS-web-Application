package com.jejianil.erms.service;

import com.jejianil.erms.dto.request.LeaveRequestDto;
import com.jejianil.erms.dto.response.LeaveResponse;

import java.util.List;

public interface LeaveService {

    List<LeaveResponse> getAllLeaves();
    LeaveResponse applyLeave(LeaveRequestDto request);

    List<LeaveResponse> getEmployeeLeaves(Long employeeId);

    List<LeaveResponse> getPendingLeaves();

    LeaveResponse approveLeave(Long leaveId, Long approverId);

    LeaveResponse rejectLeave(Long leaveId, Long approverId);
}
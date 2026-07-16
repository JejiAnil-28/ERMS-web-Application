package com.jejianil.erms.service.impl;

import com.jejianil.erms.dto.request.LeaveRequestDto;
import com.jejianil.erms.dto.response.LeaveResponse;
import com.jejianil.erms.entity.Employee;
import com.jejianil.erms.entity.LeaveRequest;
import com.jejianil.erms.entity.User;
import com.jejianil.erms.exception.ResourceNotFoundException;
import com.jejianil.erms.mapper.LeaveMapper;
import com.jejianil.erms.repository.EmployeeRepository;
import com.jejianil.erms.repository.LeaveRequestRepository;
import com.jejianil.erms.repository.UserRepository;
import com.jejianil.erms.service.LeaveService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveServiceImpl implements LeaveService {

    private final LeaveRequestRepository leaveRepository;
    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;

    public LeaveServiceImpl(
            LeaveRequestRepository leaveRepository,
            EmployeeRepository employeeRepository,
            UserRepository userRepository) {

        this.leaveRepository = leaveRepository;
        this.employeeRepository = employeeRepository;
        this.userRepository = userRepository;
    }
    @Override
    public LeaveResponse applyLeave(
            LeaveRequestDto request) {

        Employee employee = employeeRepository.findById(
                        request.getEmployeeId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with id: "
                                        + request.getEmployeeId()));

        LeaveRequest leave = new LeaveRequest();

        leave.setEmployee(employee);
        leave.setLeaveType(request.getLeaveType());
        leave.setStartDate(request.getStartDate());
        leave.setEndDate(request.getEndDate());
        leave.setReason(request.getReason());
        leave.setStatus("PENDING");

        LeaveRequest savedLeave =
                leaveRepository.save(leave);

        return LeaveMapper.toResponse(savedLeave);
    }

    @Override
    public List<LeaveResponse> getEmployeeLeaves(Long employeeId) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @Override
    public List<LeaveResponse> getPendingLeaves() {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @Override
    public LeaveResponse approveLeave(Long leaveId, Long approverId) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @Override
    public LeaveResponse rejectLeave(Long leaveId, Long approverId) {
        throw new UnsupportedOperationException("Not implemented yet");
    }
}
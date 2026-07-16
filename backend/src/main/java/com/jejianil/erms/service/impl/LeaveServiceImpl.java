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

import java.time.LocalDateTime;
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

        return leaveRepository.findByEmployeeId(employeeId)
                .stream()
                .map(LeaveMapper::toResponse)
                .toList();
    }

    @Override
    public List<LeaveResponse> getPendingLeaves() {

        return leaveRepository.findByStatusIgnoreCase("PENDING")
                .stream()
                .map(LeaveMapper::toResponse)
                .toList();
    }

    @Override
    public LeaveResponse approveLeave(Long leaveId, Long approverId) {

        LeaveRequest leave = findLeaveById(leaveId);

        if (!leave.getStatus().equalsIgnoreCase("PENDING")) {
            throw new IllegalStateException(
                    "Leave request has already been processed."
            );
        }

        User approver = findUserById(approverId);

        leave.setStatus("APPROVED");
        leave.setApprovedBy(approver);
        leave.setApprovedAt(LocalDateTime.now());

        LeaveRequest updatedLeave =
                leaveRepository.save(leave);

        return LeaveMapper.toResponse(updatedLeave);
    }

    @Override
    public LeaveResponse rejectLeave(Long leaveId, Long approverId) {

        LeaveRequest leave = findLeaveById(leaveId);

        if (!leave.getStatus().equalsIgnoreCase("PENDING")) {
            throw new IllegalStateException(
                    "Leave request has already been processed."
            );
        }

        User approver = findUserById(approverId);

        leave.setStatus("REJECTED");
        leave.setApprovedBy(approver);
        leave.setApprovedAt(LocalDateTime.now());

        LeaveRequest updatedLeave =
                leaveRepository.save(leave);

        return LeaveMapper.toResponse(updatedLeave);
    }

    private LeaveRequest findLeaveById(Long leaveId) {

        return leaveRepository.findById(leaveId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Leave request not found with id: " + leaveId
                        ));
    }

    private User findUserById(Long userId) {

        return userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id: " + userId
                        ));
    }
}
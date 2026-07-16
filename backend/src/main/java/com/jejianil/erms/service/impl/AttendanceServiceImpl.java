package com.jejianil.erms.service.impl;

import com.jejianil.erms.dto.request.AttendanceRequest;
import com.jejianil.erms.dto.response.AttendanceResponse;
import com.jejianil.erms.entity.Attendance;
import com.jejianil.erms.entity.Employee;
import com.jejianil.erms.exception.DuplicateResourceException;
import com.jejianil.erms.exception.ResourceNotFoundException;
import com.jejianil.erms.mapper.AttendanceMapper;
import com.jejianil.erms.repository.AttendanceRepository;
import com.jejianil.erms.repository.EmployeeRepository;
import com.jejianil.erms.service.AttendanceService;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    public AttendanceServiceImpl(
            AttendanceRepository attendanceRepository,
            EmployeeRepository employeeRepository) {

        this.attendanceRepository = attendanceRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public AttendanceResponse checkIn(AttendanceRequest request) {

        Employee employee = employeeRepository.findById(request.getEmployeeId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with id: "
                                        + request.getEmployeeId()
                        ));

        LocalDate today = LocalDate.now();

        if (attendanceRepository.existsByEmployeeIdAndAttendanceDate(
                employee.getId(),
                today)) {

            throw new DuplicateResourceException(
                    "Employee already checked in today."
            );
        }

        Attendance attendance = new Attendance();

        attendance.setEmployee(employee);
        attendance.setAttendanceDate(today);
        attendance.setCheckInTime(LocalTime.now());
        attendance.setStatus("PRESENT");
        attendance.setRemarks(request.getRemarks());

        Attendance savedAttendance =
                attendanceRepository.save(attendance);

        return AttendanceMapper.toResponse(savedAttendance);
    }

    @Override
    public AttendanceResponse checkOut(Long employeeId) {

        LocalDate today = LocalDate.now();

        Attendance attendance = attendanceRepository
                .findByEmployeeIdAndAttendanceDate(employeeId, today)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "No check-in found for today."
                        ));

        if (attendance.getCheckOutTime() != null) {
            throw new DuplicateResourceException(
                    "Employee already checked out today."
            );
        }

        attendance.setCheckOutTime(LocalTime.now());

        Attendance updatedAttendance =
                attendanceRepository.save(attendance);

        return AttendanceMapper.toResponse(updatedAttendance);
    }

    @Override
    public List<AttendanceResponse> getTodayAttendance() {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @Override
    public List<AttendanceResponse> getEmployeeAttendance(Long employeeId) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

}
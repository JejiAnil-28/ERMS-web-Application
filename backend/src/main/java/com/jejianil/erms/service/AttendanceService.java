package com.jejianil.erms.service;

import com.jejianil.erms.dto.request.AttendanceRequest;
import com.jejianil.erms.dto.response.AttendanceResponse;

import java.util.List;

public interface AttendanceService {

    AttendanceResponse checkIn(AttendanceRequest request);

    AttendanceResponse checkOut(Long employeeId);

    List<AttendanceResponse> getTodayAttendance();

    List<AttendanceResponse> getEmployeeAttendance(Long employeeId);
}
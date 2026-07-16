package com.jejianil.erms.service.impl;

import com.jejianil.erms.dto.response.DashboardResponse;
import com.jejianil.erms.repository.AttendanceRepository;
import com.jejianil.erms.repository.DepartmentRepository;
import com.jejianil.erms.repository.EmployeeRepository;
import com.jejianil.erms.repository.LeaveRequestRepository;
import com.jejianil.erms.service.DashboardService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final AttendanceRepository attendanceRepository;
    private final LeaveRequestRepository leaveRepository;

    public DashboardServiceImpl(
            EmployeeRepository employeeRepository,
            DepartmentRepository departmentRepository,
            AttendanceRepository attendanceRepository,
            LeaveRequestRepository leaveRepository) {

        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.attendanceRepository = attendanceRepository;
        this.leaveRepository = leaveRepository;
    }

    @Override
    public DashboardResponse getDashboardSummary() {

        DashboardResponse response = new DashboardResponse();

        response.setTotalEmployees(
                employeeRepository.count()
        );

        response.setActiveEmployees(
                employeeRepository.countByStatusIgnoreCase("ACTIVE")
        );

        response.setTotalDepartments(
                departmentRepository.count()
        );

        response.setTodayAttendance(
                attendanceRepository.countByAttendanceDate(
                        LocalDate.now()
                )
        );

        response.setPendingLeaves(
                leaveRepository.countByStatusIgnoreCase(
                        "PENDING"
                )
        );

        return response;
    }
}
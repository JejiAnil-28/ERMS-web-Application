package com.jejianil.erms.service;

import com.jejianil.erms.dto.request.EmployeeRequest;
import com.jejianil.erms.dto.response.EmployeeResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface EmployeeService {

    EmployeeResponse createEmployee(EmployeeRequest request);

    List<EmployeeResponse> getAllEmployees();

    EmployeeResponse getEmployeeById(Long id);

    EmployeeResponse updateEmployee(Long id, EmployeeRequest request);

    void deleteEmployee(Long id);

    Page<EmployeeResponse> getEmployees(
            int page,
            int size,
            String sortBy,
            String direction
    );

    List<EmployeeResponse> searchEmployees(String keyword);

    List<EmployeeResponse> getEmployeesByDepartment(Long departmentId);

    List<EmployeeResponse> getEmployeesByRole(Long roleId);

    List<EmployeeResponse> getEmployeesByStatus(String status);
}
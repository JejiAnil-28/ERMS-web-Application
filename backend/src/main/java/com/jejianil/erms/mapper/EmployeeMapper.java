package com.jejianil.erms.mapper;

import com.jejianil.erms.dto.response.EmployeeResponse;
import com.jejianil.erms.entity.Employee;

public class EmployeeMapper {

    private EmployeeMapper() {
    }

    public static EmployeeResponse toResponse(Employee employee) {

        EmployeeResponse response = new EmployeeResponse();

        response.setId(employee.getId());
        response.setEmployeeCode(employee.getEmployeeCode());
        response.setFirstName(employee.getFirstName());
        response.setLastName(employee.getLastName());
        response.setEmail(employee.getEmail());
        response.setPhone(employee.getPhone());
        response.setGender(employee.getGender());
        response.setDateOfBirth(employee.getDateOfBirth());
        response.setSalary(employee.getSalary());
        response.setHireDate(employee.getHireDate());
        response.setStatus(employee.getStatus());

        response.setDepartmentId(
                employee.getDepartment().getId());

        response.setDepartmentName(
                employee.getDepartment().getDepartmentName());

        response.setRoleId(
                employee.getRole().getId());

        response.setRoleName(
                employee.getRole().getRoleName());

        return response;
    }
}
package com.jejianil.erms.mapper;

import com.jejianil.erms.dto.request.DepartmentRequest;
import com.jejianil.erms.dto.response.DepartmentResponse;
import com.jejianil.erms.entity.Department;

public class DepartmentMapper {

    private DepartmentMapper() {
    }

    public static Department toEntity(DepartmentRequest request) {

        Department department = new Department();

        department.setDepartmentName(request.getDepartmentName());
        department.setDepartmentHead(request.getDepartmentHead());
        department.setDescription(request.getDescription());

        return department;
    }

    public static DepartmentResponse toResponse(Department department) {

        return new DepartmentResponse(

                department.getId(),

                department.getDepartmentName(),

                department.getDepartmentHead(),

                department.getDescription()
        );
    }
}
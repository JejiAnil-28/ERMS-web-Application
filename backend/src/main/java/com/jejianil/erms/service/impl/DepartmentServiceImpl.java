package com.jejianil.erms.service.impl;

import com.jejianil.erms.dto.request.DepartmentRequest;
import com.jejianil.erms.dto.response.DepartmentResponse;
import com.jejianil.erms.entity.Department;
import com.jejianil.erms.exception.DuplicateResourceException;
import com.jejianil.erms.exception.ResourceNotFoundException;
import com.jejianil.erms.mapper.DepartmentMapper;
import com.jejianil.erms.repository.DepartmentRepository;
import com.jejianil.erms.service.DepartmentService;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentServiceImpl(
            DepartmentRepository departmentRepository) {

        this.departmentRepository = departmentRepository;
    }

    @Override
    public DepartmentResponse createDepartment(
            DepartmentRequest request) {

        if (departmentRepository.existsByDepartmentName(
                request.getDepartmentName())) {

            throw new DuplicateResourceException(
                    "Department already exists.");
        }

        Department department =
                DepartmentMapper.toEntity(request);

        Department savedDepartment =
                departmentRepository.save(department);

        return DepartmentMapper.toResponse(savedDepartment);
    }

    @Override
    public List<DepartmentResponse> getAllDepartments() {

        return departmentRepository.findAll()

                .stream()

                .map(DepartmentMapper::toResponse)

                .collect(Collectors.toList());
    }

    @Override
    public DepartmentResponse getDepartmentById(Long id) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @Override
    public DepartmentResponse updateDepartment(Long id, DepartmentRequest request) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

    @Override
    public void deleteDepartment(Long id) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

}
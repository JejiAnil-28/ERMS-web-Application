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

        Department department = findDepartmentById(id);

        return DepartmentMapper.toResponse(department);
    }

    @Override
    public DepartmentResponse updateDepartment(
            Long id,
            DepartmentRequest request) {

        Department department = findDepartmentById(id);

        // Check duplicate name (only if the name is changing)
        if (!department.getDepartmentName().equals(request.getDepartmentName())
                && departmentRepository.existsByDepartmentName(request.getDepartmentName())) {

            throw new DuplicateResourceException(
                    "Department already exists."
            );
        }

        department.setDepartmentName(request.getDepartmentName());
        department.setDepartmentHead(request.getDepartmentHead());
        department.setDescription(request.getDescription());

        Department updatedDepartment =
                departmentRepository.save(department);

        return DepartmentMapper.toResponse(updatedDepartment);
    }

    @Override
    public void deleteDepartment(Long id) {

        Department department = findDepartmentById(id);

        departmentRepository.delete(department);
    }

    private Department findDepartmentById(Long id) {

        return departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Department not found with id: " + id
                        ));
    }


}
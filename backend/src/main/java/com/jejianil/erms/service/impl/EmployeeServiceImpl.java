package com.jejianil.erms.service.impl;

import com.jejianil.erms.dto.request.EmployeeRequest;
import com.jejianil.erms.dto.response.EmployeeResponse;
import com.jejianil.erms.entity.Department;
import com.jejianil.erms.entity.Employee;
import com.jejianil.erms.entity.Role;
import com.jejianil.erms.exception.DuplicateResourceException;
import com.jejianil.erms.exception.ResourceNotFoundException;
import com.jejianil.erms.mapper.EmployeeMapper;
import com.jejianil.erms.repository.DepartmentRepository;
import com.jejianil.erms.repository.EmployeeRepository;
import com.jejianil.erms.repository.RoleRepository;
import com.jejianil.erms.service.EmployeeService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final RoleRepository roleRepository;

    public EmployeeServiceImpl(
            EmployeeRepository employeeRepository,
            DepartmentRepository departmentRepository,
            RoleRepository roleRepository) {

        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public EmployeeResponse createEmployee(EmployeeRequest request) {

        if (employeeRepository.existsByEmployeeCode(request.getEmployeeCode())) {
            throw new DuplicateResourceException("Employee code already exists.");
        }

        if (employeeRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists.");
        }

        if (employeeRepository.existsByPhone(request.getPhone())) {
            throw new DuplicateResourceException("Phone already exists.");
        }

        Department department = findDepartmentById(request.getDepartmentId());

        Role role = findRoleById(request.getRoleId());

        Employee employee = new Employee();

        employee.setEmployeeCode(request.getEmployeeCode());
        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setEmail(request.getEmail());
        employee.setPhone(request.getPhone());
        employee.setGender(request.getGender());
        employee.setDateOfBirth(request.getDateOfBirth());
        employee.setSalary(request.getSalary());
        employee.setHireDate(request.getHireDate());

        employee.setDepartment(department);
        employee.setRole(role);

        Employee savedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.toResponse(savedEmployee);
    }

    @Override
    public List<EmployeeResponse> getAllEmployees() {

        return employeeRepository.findAll()

                .stream()

                .map(EmployeeMapper::toResponse)

                .collect(Collectors.toList());
    }

    @Override
    public EmployeeResponse getEmployeeById(Long id) {

        Employee employee = findEmployeeById(id);

        return EmployeeMapper.toResponse(employee);
    }

    @Override
    public EmployeeResponse updateEmployee(Long id, EmployeeRequest request) {

        Employee employee = findEmployeeById(id);

        // Employee Code Validation
        if (!employee.getEmployeeCode().equals(request.getEmployeeCode())
                && employeeRepository.existsByEmployeeCode(request.getEmployeeCode())) {

            throw new DuplicateResourceException("Employee code already exists.");
        }

        // Email Validation
        if (!employee.getEmail().equals(request.getEmail())
                && employeeRepository.existsByEmail(request.getEmail())) {

            throw new DuplicateResourceException("Email already exists.");
        }

        // Phone Validation
        if (!employee.getPhone().equals(request.getPhone())
                && employeeRepository.existsByPhone(request.getPhone())) {

            throw new DuplicateResourceException("Phone already exists.");
        }

        Department department = findDepartmentById(request.getDepartmentId());
        Role role = findRoleById(request.getRoleId());

        employee.setEmployeeCode(request.getEmployeeCode());
        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setEmail(request.getEmail());
        employee.setPhone(request.getPhone());
        employee.setGender(request.getGender());
        employee.setDateOfBirth(request.getDateOfBirth());
        employee.setSalary(request.getSalary());
        employee.setHireDate(request.getHireDate());

        employee.setDepartment(department);
        employee.setRole(role);

        Employee updatedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.toResponse(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long id) {

        Employee employee = findEmployeeById(id);

        employeeRepository.delete(employee);
    }

    private Employee findEmployeeById(Long id) {

        return employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with id: " + id
                        ));
    }

    private Department findDepartmentById(Long id) {

        return departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Department not found with id: " + id
                        ));
    }

    private Role findRoleById(Long id) {

        return roleRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Role not found with id: " + id
                        ));
    }

    @Override
    public Page<EmployeeResponse> getEmployees(
            int page,
            int size,
            String sortBy,
            String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable =
                PageRequest.of(page, size, sort);

        return employeeRepository.findAll(pageable)
                .map(EmployeeMapper::toResponse);
    }

}
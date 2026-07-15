package com.jejianil.erms.service.impl;

import com.jejianil.erms.dto.response.RoleResponse;
import com.jejianil.erms.mapper.RoleMapper;
import com.jejianil.erms.repository.RoleRepository;
import com.jejianil.erms.service.RoleService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public List<RoleResponse> getAllRoles() {

        return roleRepository.findAll()
                .stream()
                .map(RoleMapper::toResponse)
                .toList();
    }
}
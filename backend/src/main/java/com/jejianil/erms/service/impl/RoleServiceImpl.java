package com.jejianil.erms.service.impl;

import com.jejianil.erms.entity.Role;
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
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
}
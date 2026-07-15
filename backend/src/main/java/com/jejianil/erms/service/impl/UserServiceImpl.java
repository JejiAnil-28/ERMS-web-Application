package com.jejianil.erms.service.impl;

import com.jejianil.erms.dto.request.RegisterRequest;
import com.jejianil.erms.dto.response.UserResponse;
import com.jejianil.erms.entity.Role;
import com.jejianil.erms.entity.User;
import com.jejianil.erms.exception.DuplicateResourceException;
import com.jejianil.erms.exception.ResourceNotFoundException;
import com.jejianil.erms.mapper.UserMapper;
import com.jejianil.erms.repository.RoleRepository;
import com.jejianil.erms.repository.UserRepository;
import com.jejianil.erms.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository,
                           RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserResponse register(RegisterRequest request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new DuplicateResourceException("Username already exists.");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists.");
        }

        Role role = roleRepository.findByRoleName(request.getRole())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found."));

        User user = new User();

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        //System.out.println("Password from request: " + request.getPassword());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEnabled(true);
        user.setRole(role);

        User savedUser = userRepository.save(user);

        return UserMapper.toResponse(savedUser);
    }
}
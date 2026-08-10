package com.giftarts.service.impl;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.giftarts.dto.LoginRequest;
import com.giftarts.dto.LoginResponse;
import com.giftarts.dto.ProfileUpdateRequest;
import com.giftarts.dto.RegisterRequest;
import com.giftarts.entity.Role;
import com.giftarts.entity.User;
import com.giftarts.repository.UserRepository;
import com.giftarts.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // Admin accounts cannot be created through registration
        if (request.getRole() == Role.ADMIN) {
            throw new RuntimeException("Admin registration is not allowed");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        /*
         * If no role is supplied, create a CUSTOMER.
         */
        if (request.getRole() == null) {
            user.setRole(Role.CUSTOMER);
        } else {
            user.setRole(request.getRole());
        }

        user.setActive(true);

        return userRepository.save(user);
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (!user.isActive()) {
            throw new RuntimeException(
                    "Account disabled by Admin"
            );
        }

        boolean matches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if (!matches) {
            throw new RuntimeException("Invalid Password");
        }

        return new LoginResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name(),
                user.getProfileImage(),
                "Login Successful"
        );
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<User> getArtists() {
        return userRepository.findByRole(Role.ARTIST);
    }

    @Override
    public void toggleUserStatus(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        user.setActive(!user.isActive());

        userRepository.save(user);
    }

    @Override
    public void updateProfile(
            Long id,
            ProfileUpdateRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setProfileImage(request.getProfileImage());

        userRepository.save(user);
    }
}
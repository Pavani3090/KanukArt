package com.giftarts.service;

import java.util.List;

import com.giftarts.dto.LoginRequest;
import com.giftarts.dto.LoginResponse;
import com.giftarts.dto.ProfileUpdateRequest;
import com.giftarts.dto.RegisterRequest;
import com.giftarts.entity.User;

public interface UserService {

    User register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

    List<User> getAllUsers();

    void deleteUser(Long id);

    List<User> getArtists();

    void toggleUserStatus(Long id);

    void updateProfile(Long id, ProfileUpdateRequest request);
}
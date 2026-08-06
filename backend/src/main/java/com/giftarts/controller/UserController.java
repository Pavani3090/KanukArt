package com.giftarts.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.giftarts.entity.User;
import com.giftarts.service.UserService;
import com.giftarts.dto.ProfileUpdateRequest;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @DeleteMapping("/{id}")
    public void deleteUser(
            @PathVariable Long id) {

        userService.deleteUser(id);
    }
    @GetMapping("/artists")
    public List<User> getArtists() {
        return userService.getArtists();
    }
    @PutMapping("/{id}/toggle-status")
    public void toggleStatus(
            @PathVariable Long id) {

        userService.toggleUserStatus(id);
    }
   
    @PutMapping("/{id}/profile")
    public void updateProfile(
            @PathVariable Long id,
            @RequestBody ProfileUpdateRequest request) {

        System.out.println("===== UPDATE PROFILE =====");
        System.out.println("User ID : " + id);
        System.out.println("Name : " + request.getName());

        userService.updateProfile(id, request);
    }
}
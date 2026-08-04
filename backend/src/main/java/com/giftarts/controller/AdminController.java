package com.giftarts.controller;

import org.springframework.web.bind.annotation.*;

import com.giftarts.dto.AdminStats;
import com.giftarts.service.AdminService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/stats")
    public AdminStats getStats() {
        return adminService.getStats();
    }
}
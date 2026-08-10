package com.giftarts.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.giftarts.entity.Role;
import com.giftarts.entity.User;
import com.giftarts.repository.UserRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner createAdmin(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            String adminEmail = "admin@kanukart.com";

            if (!userRepository.existsByEmail(adminEmail)) {

                User admin = new User();

                admin.setName("KanukArt Admin");
                admin.setEmail(adminEmail);

                admin.setPassword(
                    passwordEncoder.encode("Admin@123")
                );

                admin.setRole(Role.ADMIN);
                admin.setActive(true);

                userRepository.save(admin);

                System.out.println(
                    "======================================"
                );

                System.out.println(
                    "KanukArt ADMIN account created"
                );

                System.out.println(
                    "Email    : admin@kanukart.com"
                );

                System.out.println(
                    "Password : Admin@123"
                );

                System.out.println(
                    "======================================"
                );
            }
        };
    }
}
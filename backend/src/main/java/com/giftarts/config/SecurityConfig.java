package com.giftarts.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    // =========================
    // PASSWORD ENCODER
    // =========================

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // =========================
    // SECURITY FILTER CHAIN
    // =========================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
            .cors(cors ->
                cors.configurationSource(corsConfigurationSource())
            )

            .csrf(csrf ->
                csrf.disable()
            )

            .authorizeHttpRequests(auth -> auth

                // =========================
                // PUBLIC AUTH APIs
                // =========================

                .requestMatchers(
                    "/api/auth/**"
                ).permitAll()

                // =========================
                // PUBLIC ARTWORK APIs
                // =========================

                .requestMatchers(
                    "/api/artworks",
                    "/api/artworks/**"
                ).permitAll()

                // =========================
                // ARTIST APIs
                // =========================

                .requestMatchers(
                    "/api/artists/**"
                ).permitAll()

                // =========================
                // ADMIN APIs
                // =========================

                .requestMatchers(
                    "/api/admin/**"
                ).permitAll()

                // =========================
                // OTHER REQUESTS
                // =========================

                .anyRequest().permitAll()
            );

        return http.build();
    }

    // =========================
    // CORS CONFIGURATION
    // =========================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        String frontendUrl =
                System.getenv("FRONTEND_URL");

        // Local development fallback
        if (frontendUrl == null ||
                frontendUrl.isBlank()) {

            frontendUrl =
                    "http://localhost:5173";
        }

        configuration.setAllowedOrigins(
            List.of(frontendUrl)
        );

        configuration.setAllowedMethods(
            List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
            )
        );

        configuration.setAllowedHeaders(
            List.of("*")
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
            "/**",
            configuration
        );

        return source;
    }
}
package com.giftarts.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.giftarts.entity.Role;
import com.giftarts.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    List<User> findByRole(Role role);

    @Query("SELECT COUNT(u) FROM User u WHERE u.role = com.giftarts.entity.Role.ARTIST")
    long countArtists();
}
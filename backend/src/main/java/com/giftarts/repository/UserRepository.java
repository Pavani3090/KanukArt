package com.giftarts.repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.giftarts.entity.User;
import com.giftarts.entity.Role;
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    List<User> findByRole(Role role);

    boolean existsByEmail(String email);
    @Query("""
            SELECT COUNT(u)
            FROM User u
            WHERE u.role = 'ARTIST'
        """)
        Long countArtists();
}
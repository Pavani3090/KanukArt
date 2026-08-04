package com.giftarts.service;

import org.springframework.stereotype.Service;

import com.giftarts.dto.AdminStats;
import com.giftarts.repository.ArtworkRepository;
import com.giftarts.repository.OrderRepository;
import com.giftarts.repository.UserRepository;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final ArtworkRepository artworkRepository;
    private final OrderRepository orderRepository;

    public AdminService(
            UserRepository userRepository,
            ArtworkRepository artworkRepository,
            OrderRepository orderRepository) {

        this.userRepository = userRepository;
        this.artworkRepository = artworkRepository;
        this.orderRepository = orderRepository;
    }

    public AdminStats getStats() {

        return new AdminStats(
                userRepository.count(),
                userRepository.countArtists(),
                artworkRepository.count(),
                orderRepository.count(),
                orderRepository.getTotalRevenue()
        );
    }
}
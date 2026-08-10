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

        // ==============================
        // MAIN STATISTICS
        // ==============================

        long totalUsers =
                userRepository.count();

        long totalArtists =
                userRepository.countArtists();

        long totalArtworks =
                artworkRepository.count();

        long totalOrders =
                orderRepository.count();

        Double totalRevenue =
                orderRepository.getTotalRevenue();

        if (totalRevenue == null) {
            totalRevenue = 0.0;
        }


        // ==============================
        // ORDER STATUS STATISTICS
        // ==============================

        long pendingOrders =
                orderRepository.countByStatus("PENDING");

        long confirmedOrders =
                orderRepository.countByStatus("CONFIRMED");

        long shippedOrders =
                orderRepository.countByStatus("SHIPPED");

        long deliveredOrders =
                orderRepository.countByStatus("DELIVERED");

        long rejectedOrders =
                orderRepository.countByStatus("REJECTED");


        // ==============================
        // CONSOLE LOG
        // ==============================

        System.out.println("================================");
        System.out.println("        ADMIN STATS");
        System.out.println("================================");

        System.out.println(
                "Total Users: " + totalUsers
        );

        System.out.println(
                "Total Artists: " + totalArtists
        );

        System.out.println(
                "Total Artworks: " + totalArtworks
        );

        System.out.println(
                "Total Orders: " + totalOrders
        );

        System.out.println(
                "Total Revenue: " + totalRevenue
        );

        System.out.println("--------------------------------");

        System.out.println(
                "Pending Orders: " + pendingOrders
        );

        System.out.println(
                "Confirmed Orders: " + confirmedOrders
        );

        System.out.println(
                "Shipped Orders: " + shippedOrders
        );

        System.out.println(
                "Delivered Orders: " + deliveredOrders
        );

        System.out.println(
                "Rejected Orders: " + rejectedOrders
        );

        System.out.println("================================");


        // ==============================
        // RETURN RESPONSE
        // ==============================

        return new AdminStats(
                totalUsers,
                totalArtists,
                totalArtworks,
                totalOrders,
                totalRevenue,
                pendingOrders,
                confirmedOrders,
                shippedOrders,
                deliveredOrders,
                rejectedOrders
        );
    }
}
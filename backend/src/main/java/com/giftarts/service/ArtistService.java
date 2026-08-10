package com.giftarts.service;

import org.springframework.stereotype.Service;

import com.giftarts.dto.ArtistStats;
import com.giftarts.repository.ArtworkRepository;
import com.giftarts.repository.OrderItemRepository;

@Service
public class ArtistService {

    private final ArtworkRepository artworkRepository;
    private final OrderItemRepository orderItemRepository;

    public ArtistService(
            ArtworkRepository artworkRepository,
            OrderItemRepository orderItemRepository) {

        this.artworkRepository = artworkRepository;
        this.orderItemRepository = orderItemRepository;
    }

    public ArtistStats getArtistStats(Long artistId) {

        // =========================
        // ARTWORK STATISTICS
        // =========================

        long totalArtworks =
                artworkRepository.countByArtistId(artistId);

        long approvedArtworks =
                artworkRepository.countByArtistIdAndStatus(
                        artistId,
                        "APPROVED"
                );

        long pendingArtworks =
                artworkRepository.countByArtistIdAndStatus(
                        artistId,
                        "PENDING"
                );

        long rejectedArtworks =
                artworkRepository.countByArtistIdAndStatus(
                        artistId,
                        "REJECTED"
                );

        // =========================
        // ORDER STATISTICS
        // =========================

        Long totalOrders =
                orderItemRepository.countOrdersByArtist(artistId);

        if (totalOrders == null) {
            totalOrders = 0L;
        }

        // =========================
        // REVENUE
        // =========================

        Double revenue =
                orderItemRepository.getRevenueByArtist(artistId);

        if (revenue == null) {
            revenue = 0.0;
        }

        // =========================
        // DEBUG
        // =========================

        System.out.println(
                "========== ARTIST STATS =========="
        );

        System.out.println(
                "Artist ID: " + artistId
        );

        System.out.println(
                "Total Artworks: " + totalArtworks
        );

        System.out.println(
                "Approved Artworks: " + approvedArtworks
        );

        System.out.println(
                "Pending Artworks: " + pendingArtworks
        );

        System.out.println(
                "Rejected Artworks: " + rejectedArtworks
        );

        System.out.println(
                "Total Orders: " + totalOrders
        );

        System.out.println(
                "Revenue: " + revenue
        );

        System.out.println(
                "=================================="
        );

        // =========================
        // RESPONSE
        // =========================

        ArtistStats stats = new ArtistStats();

        stats.setTotalArtworks(totalArtworks);
        stats.setApprovedArtworks(approvedArtworks);
        stats.setPendingArtworks(pendingArtworks);
        stats.setRejectedArtworks(rejectedArtworks);
        stats.setTotalOrders(totalOrders);
        stats.setRevenue(revenue);

        return stats;
    }
}
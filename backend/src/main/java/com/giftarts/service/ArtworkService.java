package com.giftarts.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.giftarts.dto.ArtistStats;
import com.giftarts.entity.Artwork;
import com.giftarts.repository.ArtworkRepository;
import com.giftarts.repository.OrderItemRepository;
import com.giftarts.repository.OrderRepository;

@Service
public class ArtworkService {

    private final ArtworkRepository artworkRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    public ArtworkService(
            ArtworkRepository artworkRepository,
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository) {

        this.artworkRepository = artworkRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }

    public Artwork saveArtwork(Artwork artwork) {
        return artworkRepository.save(artwork);
    }

    public List<Artwork> getAllArtworks() {
        return artworkRepository.findAll();
    }

    public void deleteArtwork(Long id) {
        artworkRepository.deleteById(id);
    }

    public Artwork updateArtwork(Long id, Artwork updatedArtwork) {

        Artwork artwork = artworkRepository
                .findById(id)
                .orElseThrow();

        artwork.setTitle(updatedArtwork.getTitle());
        artwork.setDescription(updatedArtwork.getDescription());
        artwork.setCategory(updatedArtwork.getCategory());
        artwork.setPrice(updatedArtwork.getPrice());
        artwork.setImageUrl(updatedArtwork.getImageUrl());

        return artworkRepository.save(artwork);
    }

    public Artwork getArtworkById(Long id) {

        return artworkRepository
                .findById(id)
                .orElseThrow();
    }

    public List<Artwork> getArtistArtworks(Long artistId) {

        return artworkRepository.findByArtistId(artistId);
    }

    public ArtistStats getArtistStats(Long artistId) {

        long totalArtworks =
                artworkRepository.countByArtistId(artistId);

        long totalOrders =
                orderItemRepository.countOrdersByArtist(artistId);

        double revenue =
                orderItemRepository.getRevenueByArtist(artistId);

        ArtistStats stats = new ArtistStats();

        stats.setTotalArtworks(totalArtworks);
        stats.setTotalOrders(totalOrders);
        stats.setRevenue(revenue);

        return stats;
    }

    // =========================
    // Artwork Approval System
    // =========================

    public List<Artwork> getPendingArtworks() {

        return artworkRepository.findByStatus("PENDING");
    }

    public Artwork updateArtworkStatus(
            Long id,
            String status) {

        Artwork artwork = artworkRepository
                .findById(id)
                .orElseThrow();

        artwork.setStatus(status);

        return artworkRepository.save(artwork);
    }
    public List<Artwork> getApprovedArtworks() {

        return artworkRepository.findByStatus(
                "APPROVED"
        );
    }
}
package com.giftarts.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.giftarts.entity.Artwork;
import com.giftarts.repository.ArtworkRepository;

@Service
public class ArtworkService {

    private final ArtworkRepository artworkRepository;

    public ArtworkService(
            ArtworkRepository artworkRepository) {

        this.artworkRepository = artworkRepository;
    }

    // =========================
    // CREATE ARTWORK
    // =========================

    public Artwork saveArtwork(Artwork artwork) {

        return artworkRepository.save(artwork);
    }

    // =========================
    // GET ALL ARTWORKS
    // =========================

    public List<Artwork> getAllArtworks() {

        return artworkRepository.findAll();
    }

    // =========================
    // DELETE ARTWORK
    // =========================

    public void deleteArtwork(Long id) {

        artworkRepository.deleteById(id);
    }

    // =========================
    // UPDATE ARTWORK
    // =========================

    public Artwork updateArtwork(
            Long id,
            Artwork updatedArtwork) {

        Artwork artwork = artworkRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Artwork not found"
                        )
                );

        artwork.setTitle(
                updatedArtwork.getTitle()
        );

        artwork.setDescription(
                updatedArtwork.getDescription()
        );

        artwork.setCategory(
                updatedArtwork.getCategory()
        );

        artwork.setPrice(
                updatedArtwork.getPrice()
        );

        artwork.setImageUrl(
                updatedArtwork.getImageUrl()
        );

        return artworkRepository.save(artwork);
    }

    // =========================
    // GET ARTWORK BY ID
    // =========================

    public Artwork getArtworkById(Long id) {

        return artworkRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Artwork not found"
                        )
                );
    }

    // =========================
    // GET ARTIST ARTWORKS
    // =========================

    public List<Artwork> getArtistArtworks(
            Long artistId) {

        return artworkRepository
                .findByArtistId(artistId);
    }

    // =========================
    // PENDING ARTWORKS
    // =========================

    public List<Artwork> getPendingArtworks() {

        return artworkRepository
                .findByStatus("PENDING");
    }

    // =========================
    // APPROVED ARTWORKS
    // =========================

    public List<Artwork> getApprovedArtworks() {

        return artworkRepository
                .findByStatus("APPROVED");
    }

    // =========================
    // UPDATE ARTWORK STATUS
    // =========================

    public Artwork updateArtworkStatus(
            Long id,
            String status) {

        Artwork artwork = artworkRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Artwork not found"
                        )
                );

        artwork.setStatus(status);

        return artworkRepository.save(artwork);
    }
}
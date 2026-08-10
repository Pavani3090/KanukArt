package com.giftarts.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.giftarts.entity.Artwork;
import com.giftarts.service.ArtworkService;

@RestController
@RequestMapping("/api/artworks")
@CrossOrigin(origins = "http://localhost:5173")
public class ArtworkController {

    private final ArtworkService artworkService;

    public ArtworkController(ArtworkService artworkService) {
        this.artworkService = artworkService;
    }

    // =========================
    // ADD ARTWORK
    // =========================

    @PostMapping
    public Artwork addArtwork(
            @RequestBody Artwork artwork) {

        return artworkService.saveArtwork(artwork);
    }

    // =========================
    // GET ALL ARTWORKS
    // =========================

    @GetMapping
    public List<Artwork> getAllArtworks() {

        return artworkService.getAllArtworks();
    }

    // =========================
    // GET ARTIST ARTWORKS
    // =========================

    @GetMapping("/artist/{artistId}")
    public List<Artwork> getArtistArtworks(
            @PathVariable Long artistId) {

        return artworkService.getArtistArtworks(artistId);
    }

    // =========================
    // GET PENDING ARTWORKS
    // =========================

    @GetMapping("/pending")
    public List<Artwork> getPendingArtworks() {

        return artworkService.getPendingArtworks();
    }

    // =========================
    // GET APPROVED ARTWORKS
    // =========================

    @GetMapping("/approved")
    public List<Artwork> getApprovedArtworks() {

        return artworkService.getApprovedArtworks();
    }

    // =========================
    // GET ARTWORK BY ID
    // =========================

    @GetMapping("/{id}")
    public Artwork getArtworkById(
            @PathVariable Long id) {

        return artworkService.getArtworkById(id);
    }

    // =========================
    // UPDATE ARTWORK STATUS
    // =========================

    @PutMapping("/{id}/status")
    public Artwork updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return artworkService.updateArtworkStatus(
                id,
                status
        );
    }

    // =========================
    // UPDATE ARTWORK
    // =========================

    @PutMapping("/{id}")
    public Artwork updateArtwork(
            @PathVariable Long id,
            @RequestBody Artwork artwork) {

        return artworkService.updateArtwork(
                id,
                artwork
        );
    }

    // =========================
    // DELETE ARTWORK
    // =========================

    @DeleteMapping("/{id}")
    public String deleteArtwork(
            @PathVariable Long id) {

        artworkService.deleteArtwork(id);

        return "Artwork Deleted Successfully";
    }
}
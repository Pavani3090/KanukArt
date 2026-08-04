package com.giftarts.controller;
import com.giftarts.dto.ArtistStats;

import java.util.List;

import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public Artwork addArtwork(@RequestBody Artwork artwork) {
        return artworkService.saveArtwork(artwork);
    }

    @GetMapping
    public List<Artwork> getAllArtworks() {
        return artworkService.getAllArtworks();
    }
    @DeleteMapping("/{id}")
    public String deleteArtwork(@PathVariable Long id) {

        artworkService.deleteArtwork(id);

        return "Artwork Deleted Successfully";
    }
    @PutMapping("/{id}")
    public Artwork updateArtwork(
            @PathVariable Long id,
            @RequestBody Artwork artwork) {

        return artworkService.updateArtwork(id, artwork);
    }
    @GetMapping("/{id}")
    public Artwork getArtworkById(
            @PathVariable Long id) {

        return artworkService.getArtworkById(id);
    }
    @GetMapping("/artist/{artistId}")
    public List<Artwork> getArtistArtworks(
            @PathVariable Long artistId) {

        return artworkService.getArtistArtworks(artistId);
    }
    @GetMapping("/artist-stats/{artistId}")
    public ArtistStats getArtistStats(
            @PathVariable Long artistId) {

        return artworkService.getArtistStats(artistId);
    }
    @GetMapping("/pending")
    public List<Artwork> getPendingArtworks() {
        return artworkService.getPendingArtworks();
    }

    @PutMapping("/{id}/status")
    public Artwork updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return artworkService
                .updateArtworkStatus(id, status);
    }
    @GetMapping("/approved")
    public List<Artwork> getApprovedArtworks() {

        return artworkService.getApprovedArtworks();
    }
}
package com.giftarts.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.giftarts.dto.ArtistStats;
import com.giftarts.service.ArtistService;

@RestController
@RequestMapping("/api/artists")
@CrossOrigin(origins = "http://localhost:5173")
public class ArtistController {

    private final ArtistService artistService;

    public ArtistController(ArtistService artistService) {
        this.artistService = artistService;
    }

    @GetMapping("/{artistId}/stats")
    public ResponseEntity<ArtistStats> getArtistStats(
            @PathVariable Long artistId) {

        System.out.println(
                "GET /api/artists/" + artistId + "/stats"
        );

        ArtistStats stats =
                artistService.getArtistStats(artistId);

        return ResponseEntity.ok(stats);
    }
}
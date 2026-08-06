package com.giftarts.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.giftarts.entity.Artwork;

public interface ArtworkRepository extends JpaRepository<Artwork, Long> {

    List<Artwork> findByArtistId(Long artistId);

    long countByArtistId(Long artistId);

    long countByArtistIdAndStatus(Long artistId, String status);

    List<Artwork> findByStatus(String status);

}
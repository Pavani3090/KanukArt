package com.giftarts.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.giftarts.dto.ArtistOrderResponse;
import com.giftarts.entity.OrderItem;

public interface OrderItemRepository
        extends JpaRepository<OrderItem, Long> {

    @Query("""
        SELECT COUNT(oi)
        FROM OrderItem oi
        WHERE oi.artwork.artist.id = :artistId
    """)
    Long countOrdersByArtist(Long artistId);

    @Query("""
        SELECT COALESCE(
            SUM(oi.price * oi.quantity),
            0
        )
        FROM OrderItem oi
        WHERE oi.artwork.artist.id = :artistId
    """)
    Double getRevenueByArtist(Long artistId);

    List<OrderItem> findByOrderId(Long orderId);

    @Query("""
        SELECT new com.giftarts.dto.ArtistOrderResponse(
            o.id,
            o.user.name,
            a.id,
            a.title,
            a.imageUrl,
            oi.quantity,
            oi.price,
            o.status,
            o.orderDate
        )
        FROM OrderItem oi
        JOIN oi.order o
        JOIN oi.artwork a
        WHERE a.artist.id = :artistId
        ORDER BY o.orderDate DESC
    """)
    List<ArtistOrderResponse> findOrdersByArtist(
            @Param("artistId") Long artistId
    );
}
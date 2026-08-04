package com.giftarts.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.giftarts.entity.OrderItem;
import java.util.List;
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
}
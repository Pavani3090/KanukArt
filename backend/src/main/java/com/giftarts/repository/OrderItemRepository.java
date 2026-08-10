package com.giftarts.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.giftarts.dto.ArtistOrderResponse;
import com.giftarts.dto.CustomerOrderResponse;
import com.giftarts.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    // =========================
    // ARTIST ORDER COUNT
    // =========================

    @Query("""
        SELECT COUNT(DISTINCT oi.order.id)
        FROM OrderItem oi
        WHERE oi.artwork.artist.id = :artistId
    """)
    Long countOrdersByArtist(
            @Param("artistId") Long artistId
    );

    // =========================
    // ARTIST REVENUE
    // =========================

    @Query("""
        SELECT COALESCE(
            SUM(oi.price * oi.quantity),
            0
        )
        FROM OrderItem oi
        WHERE oi.artwork.artist.id = :artistId
    """)
    Double getRevenueByArtist(
            @Param("artistId") Long artistId
    );

    // =========================
    // ORDER ITEMS BY ORDER
    // =========================

    List<OrderItem> findByOrderId(Long orderId);

    // =========================
    // ARTIST ORDERS
    // =========================

    @Query("""
        SELECT new com.giftarts.dto.ArtistOrderResponse(
            oi.id,
            o.id,
            o.user.name,
            a.id,
            a.title,
            a.imageUrl,
            oi.quantity,
            oi.price,
            oi.status,
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

    // =========================
    // CUSTOMER ORDERS
    // =========================

    @Query("""
        SELECT new com.giftarts.dto.CustomerOrderResponse(
            oi.id,
            o.id,
            a.id,
            a.title,
            a.imageUrl,
            oi.quantity,
            oi.price,
            oi.status,
            o.orderDate
        )
        FROM OrderItem oi
        JOIN oi.order o
        JOIN oi.artwork a
        WHERE o.user.id = :userId
        ORDER BY o.orderDate DESC
    """)
    List<CustomerOrderResponse> findCustomerOrders(
            @Param("userId") Long userId
    );
}
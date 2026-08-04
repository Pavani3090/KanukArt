package com.giftarts.repository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.jpa.repository.JpaRepository;

import com.giftarts.entity.Order;

public interface OrderRepository
        extends JpaRepository<Order, Long> {

    List<Order> findByUserId(Long userId);
    @Query("""
    	    SELECT COALESCE(SUM(o.totalAmount),0)
    	    FROM Order o
    	""")
    	Double getTotalRevenue();
    
}
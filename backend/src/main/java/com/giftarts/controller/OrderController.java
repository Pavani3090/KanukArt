package com.giftarts.controller;

import java.util.List;
import com.giftarts.dto.ArtistOrderResponse;
import com.giftarts.dto.OrderItemResponse;
import com.giftarts.dto.CheckoutRequest;

import org.springframework.web.bind.annotation.*;

import com.giftarts.entity.Order;
import com.giftarts.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public Order placeOrder(
            @RequestBody CheckoutRequest request) {

        return orderService.placeOrder(request);
    }

    @GetMapping
    public List<Order> getAllOrders() {

        return orderService.getAllOrders();
    }
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(
            @PathVariable Long userId) {

        return orderService.getOrdersByUser(userId);
    }
    @GetMapping("/{orderId}/items")
    public List<OrderItemResponse> getOrderItems(
            @PathVariable Long orderId) {

        return orderService.getOrderItems(orderId);
    }
    @PutMapping("/{orderId}/status")
    public Order updateOrderStatus(
            @PathVariable Long orderId,
            @RequestParam String status) {

        return orderService.updateOrderStatus(
                orderId,
                status
        );
    }
    @GetMapping("/artist/{artistId}")
    public List<ArtistOrderResponse> getOrdersByArtist(
            @PathVariable Long artistId) {

        return orderService.getOrdersByArtist(artistId);

    }
    
}
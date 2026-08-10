package com.giftarts.service;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.giftarts.dto.ArtistOrderResponse;
import com.giftarts.dto.CartItemDto;
import com.giftarts.dto.CheckoutRequest;
import com.giftarts.dto.OrderItemResponse;

import com.giftarts.entity.Artwork;
import com.giftarts.entity.Order;
import com.giftarts.entity.OrderItem;
import com.giftarts.entity.User;
import com.giftarts.dto.CustomerOrderResponse;

import com.giftarts.repository.ArtworkRepository;
import com.giftarts.repository.OrderItemRepository;
import com.giftarts.repository.OrderRepository;
import com.giftarts.repository.UserRepository;
@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
   
    private final UserRepository userRepository;
    private final ArtworkRepository artworkRepository;

    public OrderService(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            UserRepository userRepository,
            ArtworkRepository artworkRepository) {

        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.userRepository = userRepository;
        this.artworkRepository = artworkRepository;
    }

    public Order placeOrder(CheckoutRequest request) {

        User user = userRepository
                .findById(request.getUserId())
                .orElseThrow();

        Order order = new Order();

        order.setUser(user);
        order.setTotalAmount(request.getTotalAmount());
        order.setStatus("PENDING");
        order.setOrderDate(LocalDateTime.now());

        Order savedOrder =
                orderRepository.save(order);

        for (CartItemDto item : request.getItems()) {

            Artwork artwork =
                    artworkRepository
                            .findById(item.getArtworkId())
                            .orElseThrow();

            OrderItem orderItem = new OrderItem();

            orderItem.setOrder(savedOrder);
            orderItem.setArtwork(artwork);
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPrice(item.getPrice());

            // Every artwork starts as PENDING
            orderItem.setStatus("PENDING");

            orderItemRepository.save(orderItem);
        }

        return savedOrder;
    }
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    public List<Order> getOrdersByUser(Long userId) {

        return orderRepository.findByUserId(userId);
    }
    public List<OrderItemResponse> getOrderItems(
            Long orderId) {

        List<OrderItem> items =
                orderItemRepository.findByOrderId(orderId);

        return items.stream()
                .map(item -> new OrderItemResponse(
                        item.getArtwork().getId(),
                        item.getArtwork().getTitle(),
                        item.getArtwork().getImageUrl(),
                        item.getQuantity(),
                        item.getPrice()
                ))
                .toList();
    }
    public Order updateOrderStatus(
            Long orderId,
            String status) {

        Order order = orderRepository
                .findById(orderId)
                .orElseThrow();

        order.setStatus(status);

        return orderRepository.save(order);
    }
    public List<ArtistOrderResponse> getOrdersByArtist(Long artistId) {
        return orderItemRepository.findOrdersByArtist(artistId);
    }
    public OrderItem updateOrderItemStatus(
            Long orderItemId,
            String status) {

        OrderItem item = orderItemRepository
                .findById(orderItemId)
                .orElseThrow();

        item.setStatus(status);

        return orderItemRepository.save(item);
    }
    public List<CustomerOrderResponse> getCustomerOrders(Long userId) {

        return orderItemRepository.findCustomerOrders(userId);
    }
}
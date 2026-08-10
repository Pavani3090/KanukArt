package com.giftarts.dto;

import java.time.LocalDateTime;

public class CustomerOrderResponse {

    private Long orderItemId;
    private Long orderId;

    private Long artworkId;
    private String artworkTitle;
    private String artworkImage;

    private Integer quantity;
    private Double price;

    private String status;
    private LocalDateTime orderDate;

    public CustomerOrderResponse() {
    }

    public CustomerOrderResponse(
            Long orderItemId,
            Long orderId,
            Long artworkId,
            String artworkTitle,
            String artworkImage,
            Integer quantity,
            Double price,
            String status,
            LocalDateTime orderDate) {

        this.orderItemId = orderItemId;
        this.orderId = orderId;
        this.artworkId = artworkId;
        this.artworkTitle = artworkTitle;
        this.artworkImage = artworkImage;
        this.quantity = quantity;
        this.price = price;
        this.status = status;
        this.orderDate = orderDate;
    }

    public Long getOrderItemId() {
        return orderItemId;
    }

    public void setOrderItemId(Long orderItemId) {
        this.orderItemId = orderItemId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getArtworkId() {
        return artworkId;
    }

    public void setArtworkId(Long artworkId) {
        this.artworkId = artworkId;
    }

    public String getArtworkTitle() {
        return artworkTitle;
    }

    public void setArtworkTitle(String artworkTitle) {
        this.artworkTitle = artworkTitle;
    }

    public String getArtworkImage() {
        return artworkImage;
    }

    public void setArtworkImage(String artworkImage) {
        this.artworkImage = artworkImage;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }
}
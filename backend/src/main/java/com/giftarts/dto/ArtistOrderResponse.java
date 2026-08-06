package com.giftarts.dto;

import java.time.LocalDateTime;

public class ArtistOrderResponse {

    private Long orderId;
    private String customerName;

    private Long artworkId;
    private String artworkTitle;
    private String artworkImage;

    private Integer quantity;
    private Double price;

    private String status;
    private LocalDateTime orderDate;

    public ArtistOrderResponse() {
    }

    public ArtistOrderResponse(
            Long orderId,
            String customerName,
            Long artworkId,
            String artworkTitle,
            String artworkImage,
            Integer quantity,
            Double price,
            String status,
            LocalDateTime orderDate) {

        this.orderId = orderId;
        this.customerName = customerName;
        this.artworkId = artworkId;
        this.artworkTitle = artworkTitle;
        this.artworkImage = artworkImage;
        this.quantity = quantity;
        this.price = price;
        this.status = status;
        this.orderDate = orderDate;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
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
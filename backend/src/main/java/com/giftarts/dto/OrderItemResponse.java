package com.giftarts.dto;

public class OrderItemResponse {

    private Long artworkId;
    private String artworkTitle;
    private String imageUrl;
    private Integer quantity;
    private Double price;

    public OrderItemResponse() {
    }

    public OrderItemResponse(
            Long artworkId,
            String artworkTitle,
            String imageUrl,
            Integer quantity,
            Double price) {

        this.artworkId = artworkId;
        this.artworkTitle = artworkTitle;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
        this.price = price;
    }

    public Long getArtworkId() {
        return artworkId;
    }

    public String getArtworkTitle() {
        return artworkTitle;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public Double getPrice() {
        return price;
    }
}
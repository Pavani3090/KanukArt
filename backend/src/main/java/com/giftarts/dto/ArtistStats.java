package com.giftarts.dto;

public class ArtistStats {

	private Long totalArtworks;
    private Long totalOrders;
    private Double revenue;
    

    public ArtistStats() {
    }

    public ArtistStats(
            long totalArtworks,
            long totalOrders) {

        this.totalArtworks = totalArtworks;
        this.totalOrders = totalOrders;
    }

    public long getTotalArtworks() {
        return totalArtworks;
    }

    public void setTotalArtworks(long totalArtworks) {
        this.totalArtworks = totalArtworks;
    }

    public long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(long totalOrders) {
        this.totalOrders = totalOrders;
    }
    public Double getRevenue() {
        return revenue;
    }

    public void setRevenue(Double revenue) {
        this.revenue = revenue;
    }
}
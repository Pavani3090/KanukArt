package com.giftarts.dto;

public class ArtistStats {

    private Long totalArtworks;
    private Long approvedArtworks;
    private Long pendingArtworks;
    private Long rejectedArtworks;
    private Long totalOrders;
    private Double revenue;

    public ArtistStats() {
    }

    public Long getTotalArtworks() {
        return totalArtworks;
    }

    public void setTotalArtworks(Long totalArtworks) {
        this.totalArtworks = totalArtworks;
    }

    public Long getApprovedArtworks() {
        return approvedArtworks;
    }

    public void setApprovedArtworks(Long approvedArtworks) {
        this.approvedArtworks = approvedArtworks;
    }

    public Long getPendingArtworks() {
        return pendingArtworks;
    }

    public void setPendingArtworks(Long pendingArtworks) {
        this.pendingArtworks = pendingArtworks;
    }

    public Long getRejectedArtworks() {
        return rejectedArtworks;
    }

    public void setRejectedArtworks(Long rejectedArtworks) {
        this.rejectedArtworks = rejectedArtworks;
    }

    public Long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(Long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public Double getRevenue() {
        return revenue;
    }

    public void setRevenue(Double revenue) {
        this.revenue = revenue;
    }
}
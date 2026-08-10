package com.giftarts.dto;

public class ArtistStats {

    private long totalArtworks;
    private long approvedArtworks;
    private long pendingArtworks;
    private long rejectedArtworks;
    private long totalOrders;
    private double revenue;

    public ArtistStats() {
    }

    public ArtistStats(
            long totalArtworks,
            long approvedArtworks,
            long pendingArtworks,
            long rejectedArtworks,
            long totalOrders,
            double revenue) {

        this.totalArtworks = totalArtworks;
        this.approvedArtworks = approvedArtworks;
        this.pendingArtworks = pendingArtworks;
        this.rejectedArtworks = rejectedArtworks;
        this.totalOrders = totalOrders;
        this.revenue = revenue;
    }

    public long getTotalArtworks() {
        return totalArtworks;
    }

    public void setTotalArtworks(long totalArtworks) {
        this.totalArtworks = totalArtworks;
    }

    public long getApprovedArtworks() {
        return approvedArtworks;
    }

    public void setApprovedArtworks(long approvedArtworks) {
        this.approvedArtworks = approvedArtworks;
    }

    public long getPendingArtworks() {
        return pendingArtworks;
    }

    public void setPendingArtworks(long pendingArtworks) {
        this.pendingArtworks = pendingArtworks;
    }

    public long getRejectedArtworks() {
        return rejectedArtworks;
    }

    public void setRejectedArtworks(long rejectedArtworks) {
        this.rejectedArtworks = rejectedArtworks;
    }

    public long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public double getRevenue() {
        return revenue;
    }

    public void setRevenue(double revenue) {
        this.revenue = revenue;
    }
}
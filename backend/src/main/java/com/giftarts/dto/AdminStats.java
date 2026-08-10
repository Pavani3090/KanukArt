package com.giftarts.dto;

public class AdminStats {

    private long totalUsers;
    private long totalArtists;
    private long totalArtworks;
    private long totalOrders;
    private Double totalRevenue;

    private long pendingOrders;
    private long confirmedOrders;
    private long shippedOrders;
    private long deliveredOrders;
    private long rejectedOrders;

    public AdminStats() {
    }

    public AdminStats(
            long totalUsers,
            long totalArtists,
            long totalArtworks,
            long totalOrders,
            Double totalRevenue,
            long pendingOrders,
            long confirmedOrders,
            long shippedOrders,
            long deliveredOrders,
            long rejectedOrders) {

        this.totalUsers = totalUsers;
        this.totalArtists = totalArtists;
        this.totalArtworks = totalArtworks;
        this.totalOrders = totalOrders;
        this.totalRevenue = totalRevenue;

        this.pendingOrders = pendingOrders;
        this.confirmedOrders = confirmedOrders;
        this.shippedOrders = shippedOrders;
        this.deliveredOrders = deliveredOrders;
        this.rejectedOrders = rejectedOrders;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalArtists() {
        return totalArtists;
    }

    public void setTotalArtists(long totalArtists) {
        this.totalArtists = totalArtists;
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

    public Double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(Double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public long getPendingOrders() {
        return pendingOrders;
    }

    public void setPendingOrders(long pendingOrders) {
        this.pendingOrders = pendingOrders;
    }

    public long getConfirmedOrders() {
        return confirmedOrders;
    }

    public void setConfirmedOrders(long confirmedOrders) {
        this.confirmedOrders = confirmedOrders;
    }

    public long getShippedOrders() {
        return shippedOrders;
    }

    public void setShippedOrders(long shippedOrders) {
        this.shippedOrders = shippedOrders;
    }

    public long getDeliveredOrders() {
        return deliveredOrders;
    }

    public void setDeliveredOrders(long deliveredOrders) {
        this.deliveredOrders = deliveredOrders;
    }

    public long getRejectedOrders() {
        return rejectedOrders;
    }

    public void setRejectedOrders(long rejectedOrders) {
        this.rejectedOrders = rejectedOrders;
    }
}
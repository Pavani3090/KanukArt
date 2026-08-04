package com.giftarts.dto;

public class AdminStats {

    private Long totalUsers;
    private Long totalArtists;
    private Long totalArtworks;
    private Long totalOrders;
    private Double totalRevenue;

    public AdminStats() {}

    public AdminStats(
            Long totalUsers,
            Long totalArtists,
            Long totalArtworks,
            Long totalOrders,
            Double totalRevenue) {

        this.totalUsers = totalUsers;
        this.totalArtists = totalArtists;
        this.totalArtworks = totalArtworks;
        this.totalOrders = totalOrders;
        this.totalRevenue = totalRevenue;
    }

    public Long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(Long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public Long getTotalArtists() {
        return totalArtists;
    }

    public void setTotalArtists(Long totalArtists) {
        this.totalArtists = totalArtists;
    }

    public Long getTotalArtworks() {
        return totalArtworks;
    }

    public void setTotalArtworks(Long totalArtworks) {
        this.totalArtworks = totalArtworks;
    }

    public Long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(Long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public Double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(Double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}
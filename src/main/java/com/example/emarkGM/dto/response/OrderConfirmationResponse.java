package com.example.emarkGM.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class OrderConfirmationResponse {
    private Long orderId;
    private String status;
    private BigDecimal total;
    private String message;
    private String simulatedNotification;
    private LocalDateTime createdAt;

    public OrderConfirmationResponse() {}

    public OrderConfirmationResponse(Long orderId, String status, BigDecimal total, String message, String simulatedNotification, LocalDateTime createdAt) {
        this.orderId = orderId;
        this.status = status;
        this.total = total;
        this.message = message;
        this.simulatedNotification = simulatedNotification;
        this.createdAt = createdAt;
    }

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getSimulatedNotification() { return simulatedNotification; }
    public void setSimulatedNotification(String simulatedNotification) { this.simulatedNotification = simulatedNotification; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

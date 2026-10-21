package com.example.emarkGM.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Table("orders")
public class Order {
    @Id
    private Long id;
    @Column("user_id")
    private Long userId;
    @Column("client_name")
    private String clientName;
    @Column("client_doc")
    private String clientDoc;
    @Column("dispatch_type")
    private String dispatchType;
    @Column("payment_method")
    private String paymentMethod;
    private String address;
    @Column("shipping_cost")
    private BigDecimal shippingCost;
    private BigDecimal subtotal;
    private BigDecimal igv;
    private BigDecimal total;
    private String status;
    @Column("created_at")
    private LocalDateTime createdAt;

    @MappedCollection(idColumn = "order_id")
    private Set<OrderItem> items = new HashSet<>();

    public Order() {
        this.createdAt = LocalDateTime.now();
        this.status = "COMPLETED";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getClientName() { return clientName; }
    public void setClientName(String clientName) { this.clientName = clientName; }

    public String getClientDoc() { return clientDoc; }
    public void setClientDoc(String clientDoc) { this.clientDoc = clientDoc; }

    public String getDispatchType() { return dispatchType; }
    public void setDispatchType(String dispatchType) { this.dispatchType = dispatchType; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public BigDecimal getShippingCost() { return shippingCost; }
    public void setShippingCost(BigDecimal shippingCost) { this.shippingCost = shippingCost; }

    public BigDecimal getSubtotal() { return subtotal; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }

    public BigDecimal getIgv() { return igv; }
    public void setIgv(BigDecimal igv) { this.igv = igv; }

    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public Set<OrderItem> getItems() { return items; }
    public void setItems(Set<OrderItem> items) { this.items = items; }
}

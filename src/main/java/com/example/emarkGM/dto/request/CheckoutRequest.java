package com.example.emarkGM.dto.request;

import java.math.BigDecimal;
import java.util.List;

public class CheckoutRequest {
    private String clientName;
    private String clientDoc;
    private String dispatchType;
    private String paymentMethod;
    private String address;
    private BigDecimal shippingCost;
    private BigDecimal subtotal;
    private BigDecimal igv;
    private BigDecimal total;
    private List<CheckoutItemRequest> items;

    public CheckoutRequest() {}

    public static class CheckoutItemRequest {
        private Long productId;
        private Integer quantity;
        private BigDecimal unitPrice;

        public CheckoutItemRequest() {}

        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }
        public Integer getQuantity() { return quantity; }
        public void setQuantity(Integer quantity) { this.quantity = quantity; }
        public BigDecimal getUnitPrice() { return unitPrice; }
        public void setUnitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; }
    }

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
    public List<CheckoutItemRequest> getItems() { return items; }
    public void setItems(List<CheckoutItemRequest> items) { this.items = items; }
}

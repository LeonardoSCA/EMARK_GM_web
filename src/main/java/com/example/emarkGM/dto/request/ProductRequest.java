package com.example.emarkGM.dto.request;

import java.math.BigDecimal;

public class ProductRequest {
    private String name;
    private BigDecimal price;
    private Integer stock;
    private Long categoryId;
    private String brand;
    private String machinery;
    private String imageUrl;
    private String description;
    private String specs;

    public ProductRequest() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public String getMachinery() { return machinery; }
    public void setMachinery(String machinery) { this.machinery = machinery; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getSpecs() { return specs; }
    public void setSpecs(String specs) { this.specs = specs; }
}

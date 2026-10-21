package com.example.emarkGM.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Table("products")
public class Product {
    @Id
    private Long id;
    private String name;
    private BigDecimal price;
    private Integer stock;
    @Column("category_id")
    private Long categoryId;
    private String brand;
    private String machinery;
    @Column("image_url")
    private String imageUrl;
    private String description;
    private String specs;
    @Column("created_at")
    private LocalDateTime createdAt;

    public Product() {
        this.createdAt = LocalDateTime.now();
    }

    public Product(Long id, String name, BigDecimal price, Integer stock, Long categoryId,
                   String brand, String machinery, String imageUrl, String description, String specs) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.categoryId = categoryId;
        this.brand = brand;
        this.machinery = machinery;
        this.imageUrl = imageUrl;
        this.description = description;
        this.specs = specs;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

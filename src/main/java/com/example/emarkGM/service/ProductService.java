package com.example.emarkGM.service;

import com.example.emarkGM.dto.request.ProductRequest;
import com.example.emarkGM.model.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> getAll();
    Optional<Product> getById(Long id);
    List<Product> getByCategoryId(Long categoryId);
    List<Product> search(String query);
    Product create(ProductRequest request);
    Product update(Long id, ProductRequest request);
    void delete(Long id);
}

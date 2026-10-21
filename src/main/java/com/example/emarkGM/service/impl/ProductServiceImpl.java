package com.example.emarkGM.service.impl;

import com.example.emarkGM.dto.request.ProductRequest;
import com.example.emarkGM.model.Product;
import com.example.emarkGM.repository.ProductRepository;
import com.example.emarkGM.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getAll() {
        List<Product> products = new ArrayList<>();
        productRepository.findAll().forEach(products::add);
        return products;
    }

    @Override
    public Optional<Product> getById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public List<Product> getByCategoryId(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    @Override
    public List<Product> search(String query) {
        if (query == null || query.isBlank()) {
            return getAll();
        }
        return productRepository.searchProducts(query);
    }

    @Override
    public Product create(ProductRequest request) {
        Product product = new Product(
                null,
                request.getName(),
                request.getPrice(),
                request.getStock(),
                request.getCategoryId(),
                request.getBrand(),
                request.getMachinery(),
                request.getImageUrl(),
                request.getDescription(),
                request.getSpecs()
        );
        return productRepository.save(product);
    }

    @Override
    public Product update(Long id, ProductRequest request) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));

        existing.setName(request.getName());
        existing.setPrice(request.getPrice());
        existing.setStock(request.getStock());
        existing.setCategoryId(request.getCategoryId());
        existing.setBrand(request.getBrand());
        existing.setMachinery(request.getMachinery());
        existing.setImageUrl(request.getImageUrl());
        existing.setDescription(request.getDescription());
        existing.setSpecs(request.getSpecs());

        return productRepository.save(existing);
    }

    @Override
    public void delete(Long id) {
        productRepository.deleteById(id);
    }
}

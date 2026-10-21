package com.example.emarkGM.repository;

import com.example.emarkGM.model.Product;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {
    List<Product> findByCategoryId(Long categoryId);

    @Query("SELECT * FROM products WHERE LOWER(name) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(brand) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(machinery) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Product> searchProducts(@Param("query") String query);
}

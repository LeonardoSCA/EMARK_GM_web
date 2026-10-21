package com.example.emarkGM.modelo.repositorio;

import com.example.emarkGM.modelo.entidad.Producto;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepositorioProducto extends CrudRepository<Producto, Long> {
    List<Producto> findByCategoriaId(Long categoriaId);

    @Query("SELECT * FROM productos WHERE LOWER(nombre) LIKE LOWER(CONCAT('%', :termino, '%')) " +
           "OR LOWER(marca) LIKE LOWER(CONCAT('%', :termino, '%')) " +
           "OR LOWER(maquinaria) LIKE LOWER(CONCAT('%', :termino, '%'))")
    List<Producto> buscarProductos(@Param("termino") String termino);
}

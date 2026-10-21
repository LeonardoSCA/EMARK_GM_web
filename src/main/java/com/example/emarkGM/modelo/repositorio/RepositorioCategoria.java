package com.example.emarkGM.modelo.repositorio;

import com.example.emarkGM.modelo.entidad.Categoria;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RepositorioCategoria extends CrudRepository<Categoria, Long> {
    Optional<Categoria> findByNombre(String nombre);
}

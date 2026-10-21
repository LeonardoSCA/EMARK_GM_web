package com.example.emarkGM.servicio;

import com.example.emarkGM.modelo.entidad.Categoria;

import java.util.List;
import java.util.Optional;

public interface ServicioCategoria {
    List<Categoria> obtenerTodos();
    Optional<Categoria> obtenerPorId(Long id);
    Categoria crear(Categoria categoria);
    Categoria actualizar(Long id, Categoria categoria);
    void eliminar(Long id);
}

package com.example.emarkGM.servicio.impl;

import com.example.emarkGM.modelo.entidad.Categoria;
import com.example.emarkGM.modelo.repositorio.RepositorioCategoria;
import com.example.emarkGM.servicio.ServicioCategoria;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ServicioCategoriaImpl implements ServicioCategoria {

    private final RepositorioCategoria repositorioCategoria;

    public ServicioCategoriaImpl(RepositorioCategoria repositorioCategoria) {
        this.repositorioCategoria = repositorioCategoria;
    }

    @Override
    public List<Categoria> obtenerTodos() {
        List<Categoria> lista = new ArrayList<>();
        repositorioCategoria.findAll().forEach(lista::add);
        return lista;
    }

    @Override
    public Optional<Categoria> obtenerPorId(Long id) {
        return repositorioCategoria.findById(id);
    }

    @Override
    public Categoria crear(Categoria categoria) {
        return repositorioCategoria.save(categoria);
    }

    @Override
    public Categoria actualizar(Long id, Categoria categoria) {
        Categoria existente = repositorioCategoria.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada con id: " + id));
        existente.setNombre(categoria.getNombre());
        existente.setDescripcion(categoria.getDescripcion());
        return repositorioCategoria.save(existente);
    }

    @Override
    public void eliminar(Long id) {
        repositorioCategoria.deleteById(id);
    }
}

package com.example.emarkGM.servicio.impl;

import com.example.emarkGM.modelo.dto.solicitud.SolicitudProducto;
import com.example.emarkGM.modelo.entidad.Producto;
import com.example.emarkGM.modelo.repositorio.RepositorioProducto;
import com.example.emarkGM.servicio.ServicioProducto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ServicioProductoImpl implements ServicioProducto {

    private final RepositorioProducto repositorioProducto;

    public ServicioProductoImpl(RepositorioProducto repositorioProducto) {
        this.repositorioProducto = repositorioProducto;
    }

    @Override
    public List<Producto> obtenerTodos() {
        List<Producto> productos = new ArrayList<>();
        repositorioProducto.findAll().forEach(productos::add);
        return productos;
    }

    @Override
    public Optional<Producto> obtenerPorId(Long id) {
        return repositorioProducto.findById(id);
    }

    @Override
    public List<Producto> obtenerPorCategoriaId(Long categoriaId) {
        return repositorioProducto.findByCategoriaId(categoriaId);
    }

    @Override
    public List<Producto> buscar(String termino) {
        if (termino == null || termino.isBlank()) {
            return obtenerTodos();
        }
        return repositorioProducto.buscarProductos(termino);
    }

    @Override
    public Producto crear(SolicitudProducto solicitud) {
        Producto producto = new Producto(
                null,
                solicitud.getNombre(),
                solicitud.getPrecio(),
                solicitud.getStock(),
                solicitud.getCategoriaId(),
                solicitud.getMarca(),
                solicitud.getMaquinaria(),
                solicitud.getUrlImagen(),
                solicitud.getDescripcion(),
                solicitud.getEspecificaciones()
        );
        return repositorioProducto.save(producto);
    }

    @Override
    public Producto actualizar(Long id, SolicitudProducto solicitud) {
        Producto existente = repositorioProducto.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));

        existente.setNombre(solicitud.getNombre());
        existente.setPrecio(solicitud.getPrecio());
        existente.setStock(solicitud.getStock());
        existente.setCategoriaId(solicitud.getCategoriaId());
        existente.setMarca(solicitud.getMarca());
        existente.setMaquinaria(solicitud.getMaquinaria());
        existente.setUrlImagen(solicitud.getUrlImagen());
        existente.setDescripcion(solicitud.getDescripcion());
        existente.setEspecificaciones(solicitud.getEspecificaciones());

        return repositorioProducto.save(existente);
    }

    @Override
    public void eliminar(Long id) {
        repositorioProducto.deleteById(id);
    }
}

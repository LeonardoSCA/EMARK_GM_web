package com.example.emarkGM.modelo.servicio;

import com.example.emarkGM.modelo.solicitud.SolicitudProducto;
import com.example.emarkGM.modelo.entidad.Producto;

import java.util.List;
import java.util.Optional;

public interface ServicioProducto {
    List<Producto> obtenerTodos();
    Optional<Producto> obtenerPorId(Long id);
    List<Producto> obtenerPorCategoriaId(Long categoriaId);
    List<Producto> buscar(String termino);
    Producto crear(SolicitudProducto solicitud);
    Producto actualizar(Long id, SolicitudProducto solicitud);
    void eliminar(Long id);
}

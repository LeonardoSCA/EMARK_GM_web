package com.example.emarkGM.controlador;

import com.example.emarkGM.modelo.dto.solicitud.SolicitudProducto;
import com.example.emarkGM.modelo.entidad.Producto;
import com.example.emarkGM.servicio.ServicioProducto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ControladorProducto {

    private final ServicioProducto servicioProducto;

    public ControladorProducto(ServicioProducto servicioProducto) {
        this.servicioProducto = servicioProducto;
    }

    @GetMapping
    public ResponseEntity<List<Producto>> obtenerTodos(
            @RequestParam(required = false) Long categoriaId,
            @RequestParam(required = false) String busqueda
    ) {
        if (categoriaId != null) {
            return ResponseEntity.ok(servicioProducto.obtenerPorCategoriaId(categoriaId));
        }
        if (busqueda != null && !busqueda.isBlank()) {
            return ResponseEntity.ok(servicioProducto.buscar(busqueda));
        }
        return ResponseEntity.ok(servicioProducto.obtenerTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerPorId(@PathVariable Long id) {
        return servicioProducto.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Producto> crear(@RequestBody SolicitudProducto solicitud) {
        return ResponseEntity.ok(servicioProducto.crear(solicitud));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizar(@PathVariable Long id, @RequestBody SolicitudProducto solicitud) {
        return ResponseEntity.ok(servicioProducto.actualizar(id, solicitud));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        servicioProducto.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}

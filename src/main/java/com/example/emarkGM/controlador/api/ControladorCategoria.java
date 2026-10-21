package com.example.emarkGM.controlador.api;

import com.example.emarkGM.modelo.entidad.Categoria;
import com.example.emarkGM.modelo.servicio.ServicioCategoria;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
public class ControladorCategoria {

    private final ServicioCategoria servicioCategoria;

    public ControladorCategoria(ServicioCategoria servicioCategoria) {
        this.servicioCategoria = servicioCategoria;
    }

    @GetMapping
    public ResponseEntity<List<Categoria>> obtenerTodos() {
        return ResponseEntity.ok(servicioCategoria.obtenerTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> obtenerPorId(@PathVariable Long id) {
        return servicioCategoria.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Categoria> crear(@RequestBody Categoria categoria) {
        return ResponseEntity.ok(servicioCategoria.crear(categoria));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categoria> actualizar(@PathVariable Long id, @RequestBody Categoria categoria) {
        return ResponseEntity.ok(servicioCategoria.actualizar(id, categoria));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        servicioCategoria.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}

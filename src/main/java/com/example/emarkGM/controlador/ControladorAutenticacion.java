package com.example.emarkGM.controlador;

import com.example.emarkGM.modelo.dto.respuesta.RespuestaAutenticacion;
import com.example.emarkGM.modelo.dto.solicitud.SolicitudInicioSesion;
import com.example.emarkGM.modelo.dto.solicitud.SolicitudRegistro;
import com.example.emarkGM.servicio.ServicioAutenticacion;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/autenticacion")
public class ControladorAutenticacion {

    private final ServicioAutenticacion servicioAutenticacion;

    public ControladorAutenticacion(ServicioAutenticacion servicioAutenticacion) {
        this.servicioAutenticacion = servicioAutenticacion;
    }

    @PostMapping("/iniciar-sesion")
    public ResponseEntity<?> iniciarSesion(@RequestBody SolicitudInicioSesion solicitud) {
        try {
            RespuestaAutenticacion respuesta = servicioAutenticacion.iniciarSesion(solicitud);
            return ResponseEntity.ok(respuesta);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@RequestBody SolicitudRegistro solicitud) {
        try {
            RespuestaAutenticacion respuesta = servicioAutenticacion.registrar(solicitud);
            return ResponseEntity.ok(respuesta);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

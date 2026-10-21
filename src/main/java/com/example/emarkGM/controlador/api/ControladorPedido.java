package com.example.emarkGM.controlador.api;

import com.example.emarkGM.modelo.respuesta.RespuestaConfirmacionPedido;
import com.example.emarkGM.modelo.solicitud.SolicitudCompra;
import com.example.emarkGM.modelo.entidad.Pedido;
import com.example.emarkGM.modelo.servicio.ServicioPedido;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class ControladorPedido {

    private final ServicioPedido servicioPedido;

    public ControladorPedido(ServicioPedido servicioPedido) {
        this.servicioPedido = servicioPedido;
    }

    @PostMapping
    public ResponseEntity<RespuestaConfirmacionPedido> procesarCompra(
            Authentication autenticacion,
            @RequestBody SolicitudCompra solicitud
    ) {
        String correo = (autenticacion != null) ? autenticacion.getName() : null;
        RespuestaConfirmacionPedido respuesta = servicioPedido.procesarCompra(correo, solicitud);
        return ResponseEntity.ok(respuesta);
    }

    @GetMapping("/mis-pedidos")
    public ResponseEntity<List<Pedido>> obtenerMisPedidos(Authentication autenticacion) {
        if (autenticacion == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(servicioPedido.obtenerPedidosPorUsuario(autenticacion.getName()));
    }

    @GetMapping
    public ResponseEntity<List<Pedido>> obtenerTodosPedidos() {
        return ResponseEntity.ok(servicioPedido.obtenerTodosLosPedidos());
    }
}

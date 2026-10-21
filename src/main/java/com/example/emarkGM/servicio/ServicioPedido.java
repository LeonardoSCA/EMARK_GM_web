package com.example.emarkGM.servicio;

import com.example.emarkGM.modelo.dto.respuesta.RespuestaConfirmacionPedido;
import com.example.emarkGM.modelo.dto.solicitud.SolicitudCompra;
import com.example.emarkGM.modelo.entidad.Pedido;

import java.util.List;

public interface ServicioPedido {
    RespuestaConfirmacionPedido procesarCompra(String correoUsuario, SolicitudCompra solicitud);
    List<Pedido> obtenerPedidosPorUsuario(String correoUsuario);
    List<Pedido> obtenerTodosLosPedidos();
}

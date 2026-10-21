package com.example.emarkGM.modelo.servicio;

import com.example.emarkGM.modelo.respuesta.RespuestaConfirmacionPedido;
import com.example.emarkGM.modelo.solicitud.SolicitudCompra;
import com.example.emarkGM.modelo.entidad.DetallePedido;
import com.example.emarkGM.modelo.entidad.Pedido;
import com.example.emarkGM.modelo.entidad.Producto;
import com.example.emarkGM.modelo.entidad.Usuario;
import com.example.emarkGM.modelo.repositorio.RepositorioPedido;
import com.example.emarkGM.modelo.repositorio.RepositorioProducto;
import com.example.emarkGM.modelo.repositorio.RepositorioUsuario;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ServicioPedidoImpl implements ServicioPedido {

    private final RepositorioPedido repositorioPedido;
    private final RepositorioProducto repositorioProducto;
    private final RepositorioUsuario repositorioUsuario;

    public ServicioPedidoImpl(RepositorioPedido repositorioPedido,
                               RepositorioProducto repositorioProducto,
                               RepositorioUsuario repositorioUsuario) {
        this.repositorioPedido = repositorioPedido;
        this.repositorioProducto = repositorioProducto;
        this.repositorioUsuario = repositorioUsuario;
    }

    @Override
    @Transactional
    public RespuestaConfirmacionPedido procesarCompra(String correoUsuario, SolicitudCompra solicitud) {
        Usuario usuario = null;
        if (correoUsuario != null && !correoUsuario.isBlank()) {
            usuario = repositorioUsuario.findByCorreo(correoUsuario).orElse(null);
        }

        Pedido pedido = new Pedido();
        if (usuario != null) {
            pedido.setUsuarioId(usuario.getId());
        }
        pedido.setNombreCliente(solicitud.getNombreCliente());
        pedido.setDocumentoCliente(solicitud.getDocumentoCliente());
        pedido.setTipoEntrega(solicitud.getTipoEntrega());
        pedido.setMetodoPago(solicitud.getMetodoPago());
        pedido.setDireccion(solicitud.getDireccion());
        pedido.setCostoEnvio(solicitud.getCostoEnvio());
        pedido.setSubtotal(solicitud.getSubtotal());
        pedido.setIgv(solicitud.getIgv());
        pedido.setTotal(solicitud.getTotal());
        pedido.setEstado("COMPLETADO");
        pedido.setFechaCreacion(LocalDateTime.now());

        Set<DetallePedido> detalles = new HashSet<>();

        if (solicitud.getItems() != null) {
            for (SolicitudCompra.ItemCompra itemSolicitud : solicitud.getItems()) {
                DetallePedido detalle = new DetallePedido(
                        itemSolicitud.getProductoId(),
                        itemSolicitud.getCantidad(),
                        itemSolicitud.getPrecioUnitario()
                );
                detalles.add(detalle);

                // Descontar inventario si el producto existe
                if (itemSolicitud.getProductoId() != null) {
                    repositorioProducto.findById(itemSolicitud.getProductoId()).ifPresent(producto -> {
                        int nuevoStock = Math.max(0, producto.getStock() - itemSolicitud.getCantidad());
                        producto.setStock(nuevoStock);
                        repositorioProducto.save(producto);
                    });
                }
            }
        }
        pedido.setDetalles(detalles);

        Pedido pedidoGuardado = repositorioPedido.save(pedido);

        // Simulación de notificación y pasarela de pago
        String notificacion = String.format(
                "[SIMULACIÓN WHATSAPP/EMAIL] ¡Hola %s! Tu pedido #%d por un total de S/ %.2f ha sido procesado exitosamente vía %s. Nuestro equipo de logística iniciará el despacho %s.",
                pedidoGuardado.getNombreCliente(),
                pedidoGuardado.getId(),
                pedidoGuardado.getTotal(),
                pedidoGuardado.getMetodoPago().toUpperCase(),
                pedidoGuardado.getTipoEntrega()
        );

        return new RespuestaConfirmacionPedido(
                pedidoGuardado.getId(),
                pedidoGuardado.getEstado(),
                pedidoGuardado.getTotal(),
                "Compra y procesamiento simulados con éxito",
                notificacion,
                pedidoGuardado.getFechaCreacion()
        );
    }

    @Override
    public List<Pedido> obtenerPedidosPorUsuario(String correoUsuario) {
        return repositorioUsuario.findByCorreo(correoUsuario)
                .map(u -> repositorioPedido.findByUsuarioId(u.getId()))
                .orElse(List.of());
    }

    @Override
    public List<Pedido> obtenerTodosLosPedidos() {
        List<Pedido> lista = new ArrayList<>();
        repositorioPedido.findAll().forEach(lista::add);
        return lista;
    }
}

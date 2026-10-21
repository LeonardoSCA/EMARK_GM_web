package com.example.emarkGM.modelo.dto.respuesta;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class RespuestaConfirmacionPedido {
    private Long idPedido;
    private String estado;
    private BigDecimal total;
    private String mensaje;
    private String notificacionSimulada;
    private LocalDateTime fechaCreacion;

    public RespuestaConfirmacionPedido() {}

    public RespuestaConfirmacionPedido(Long idPedido, String estado, BigDecimal total, String mensaje,
                                       String notificacionSimulada, LocalDateTime fechaCreacion) {
        this.idPedido = idPedido;
        this.estado = estado;
        this.total = total;
        this.mensaje = mensaje;
        this.notificacionSimulada = notificacionSimulada;
        this.fechaCreacion = fechaCreacion;
    }

    public Long getIdPedido() { return idPedido; }
    public void setIdPedido(Long idPedido) { this.idPedido = idPedido; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }
    public String getMensaje() { return mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }
    public String getNotificacionSimulada() { return notificacionSimulada; }
    public void setNotificacionSimulada(String notificacionSimulada) { this.notificacionSimulada = notificacionSimulada; }
    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDateTime fechaCreacion) { this.fechaCreacion = fechaCreacion; }
}

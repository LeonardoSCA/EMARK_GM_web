package com.example.emarkGM.servicio;

import com.example.emarkGM.modelo.dto.respuesta.RespuestaAutenticacion;
import com.example.emarkGM.modelo.dto.solicitud.SolicitudInicioSesion;
import com.example.emarkGM.modelo.dto.solicitud.SolicitudRegistro;

public interface ServicioAutenticacion {
    RespuestaAutenticacion iniciarSesion(SolicitudInicioSesion solicitud);
    RespuestaAutenticacion registrar(SolicitudRegistro solicitud);
}

package com.example.emarkGM.modelo.servicio;

import com.example.emarkGM.modelo.respuesta.RespuestaAutenticacion;
import com.example.emarkGM.modelo.solicitud.SolicitudInicioSesion;
import com.example.emarkGM.modelo.solicitud.SolicitudRegistro;

public interface ServicioAutenticacion {
    RespuestaAutenticacion iniciarSesion(SolicitudInicioSesion solicitud);
    RespuestaAutenticacion registrar(SolicitudRegistro solicitud);
}

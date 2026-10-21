package com.example.emarkGM.modelo.servicio;

public interface ServicioJwt {
    String generarToken(String correo, String rol);
    String extraerCorreo(String token);
    String extraerRol(String token);
    boolean esTokenValido(String token, String correo);
}

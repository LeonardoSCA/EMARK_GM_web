package com.example.emarkGM.modelo.solicitud;

public class SolicitudRegistro {
    private String nombre;
    private String correo;
    private String contrasena;
    private String rol; // opcional, por defecto ROLE_COMPRADOR

    public SolicitudRegistro() {}

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }
    public String getContrasena() { return contrasena; }
    public void setContrasena(String contrasena) { this.contrasena = contrasena; }
    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
}

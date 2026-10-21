package com.example.emarkGM.modelo.servicio;

import com.example.emarkGM.modelo.respuesta.RespuestaAutenticacion;
import com.example.emarkGM.modelo.solicitud.SolicitudInicioSesion;
import com.example.emarkGM.modelo.solicitud.SolicitudRegistro;
import com.example.emarkGM.modelo.entidad.Usuario;
import com.example.emarkGM.modelo.repositorio.RepositorioUsuario;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ServicioAutenticacionImpl implements ServicioAutenticacion {

    private final RepositorioUsuario repositorioUsuario;
    private final PasswordEncoder codificadorContrasena;
    private final ServicioJwt servicioJwt;

    public ServicioAutenticacionImpl(RepositorioUsuario repositorioUsuario,
                                     PasswordEncoder codificadorContrasena,
                                     ServicioJwt servicioJwt) {
        this.repositorioUsuario = repositorioUsuario;
        this.codificadorContrasena = codificadorContrasena;
        this.servicioJwt = servicioJwt;
    }

    @Override
    public RespuestaAutenticacion iniciarSesion(SolicitudInicioSesion solicitud) {
        Usuario usuario = repositorioUsuario.findByCorreo(solicitud.getCorreo())
                .orElseThrow(() -> new RuntimeException("Credenciales incorrectas: usuario no encontrado"));

        if (!codificadorContrasena.matches(solicitud.getContrasena(), usuario.getContrasena())) {
            throw new RuntimeException("Credenciales incorrectas: contraseña errónea");
        }

        String token = servicioJwt.generarToken(usuario.getCorreo(), usuario.getRol());
        return new RespuestaAutenticacion(token, usuario.getId(), usuario.getNombre(),
                usuario.getCorreo(), usuario.getRol());
    }

    @Override
    public RespuestaAutenticacion registrar(SolicitudRegistro solicitud) {
        if (repositorioUsuario.existsByCorreo(solicitud.getCorreo())) {
            throw new RuntimeException("El correo electrónico ya se encuentra registrado");
        }

        String rol = (solicitud.getRol() != null && !solicitud.getRol().isBlank())
                ? solicitud.getRol()
                : "ROLE_COMPRADOR";

        Usuario usuario = new Usuario(
                solicitud.getNombre(),
                solicitud.getCorreo(),
                codificadorContrasena.encode(solicitud.getContrasena()),
                rol
        );

        Usuario usuarioGuardado = repositorioUsuario.save(usuario);
        String token = servicioJwt.generarToken(usuarioGuardado.getCorreo(), usuarioGuardado.getRol());

        return new RespuestaAutenticacion(token, usuarioGuardado.getId(), usuarioGuardado.getNombre(),
                usuarioGuardado.getCorreo(), usuarioGuardado.getRol());
    }
}

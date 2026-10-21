package com.example.emarkGM.configuracion;

import com.example.emarkGM.servicio.ServicioJwt;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Component
public class FiltroAutenticacionJwt extends OncePerRequestFilter {

    private final ServicioJwt servicioJwt;

    public FiltroAutenticacionJwt(ServicioJwt servicioJwt) {
        this.servicioJwt = servicioJwt;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest solicitud,
            @NonNull HttpServletResponse respuesta,
            @NonNull FilterChain cadenaFiltros
    ) throws ServletException, IOException {

        final String cabeceraAutenticacion = solicitud.getHeader("Authorization");
        final String jwt;
        final String correoUsuario;

        if (cabeceraAutenticacion == null || !cabeceraAutenticacion.startsWith("Bearer ")) {
            cadenaFiltros.doFilter(solicitud, respuesta);
            return;
        }

        jwt = cabeceraAutenticacion.substring(7);
        try {
            correoUsuario = servicioJwt.extraerCorreo(jwt);
            if (correoUsuario != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                if (servicioJwt.esTokenValido(jwt, correoUsuario)) {
                    String rol = servicioJwt.extraerRol(jwt);
                    List<SimpleGrantedAuthority> autoridades = (rol != null)
                            ? List.of(new SimpleGrantedAuthority(rol))
                            : Collections.emptyList();

                    UsernamePasswordAuthenticationToken tokenAutenticacion = new UsernamePasswordAuthenticationToken(
                            correoUsuario,
                            null,
                            autoridades
                    );
                    tokenAutenticacion.setDetails(new WebAuthenticationDetailsSource().buildDetails(solicitud));
                    SecurityContextHolder.getContext().setAuthentication(tokenAutenticacion);
                }
            }
        } catch (Exception excepcion) {
            // Token inválido o expirado -> continúa la cadena sin autenticación
        }

        cadenaFiltros.doFilter(solicitud, respuesta);
    }
}

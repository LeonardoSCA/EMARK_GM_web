package com.example.emarkGM.servicio.impl;

import com.example.emarkGM.servicio.ServicioJwt;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class ServicioJwtImpl implements ServicioJwt {

    @Value("${jwt.secret:404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970}")
    private String claveSecreta;

    @Value("${jwt.expiration-ms:86400000}")
    private long expiracionJwtMs;

    private SecretKey obtenerClaveFirma() {
        byte[] bytesClave = claveSecreta.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(bytesClave);
    }

    @Override
    public String generarToken(String correo, String rol) {
        Map<String, Object> reclamosExtra = new HashMap<>();
        reclamosExtra.put("rol", rol);
        return Jwts.builder()
                .claims(reclamosExtra)
                .subject(correo)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiracionJwtMs))
                .signWith(obtenerClaveFirma())
                .compact();
    }

    @Override
    public String extraerCorreo(String token) {
        return extraerReclamo(token, Claims::getSubject);
    }

    @Override
    public String extraerRol(String token) {
        Claims reclamos = extraerTodosLosReclamos(token);
        return (String) reclamos.get("rol");
    }

    @Override
    public boolean esTokenValido(String token, String correo) {
        final String correoExtraido = extraerCorreo(token);
        return (correoExtraido.equals(correo) && !estaExpirado(token));
    }

    private boolean estaExpirado(String token) {
        return extraerExpiracion(token).before(new Date());
    }

    private Date extraerExpiracion(String token) {
        return extraerReclamo(token, Claims::getExpiration);
    }

    public <T> T extraerReclamo(String token, Function<Claims, T> resolutorReclamos) {
        final Claims reclamos = extraerTodosLosReclamos(token);
        return resolutorReclamos.apply(reclamos);
    }

    private Claims extraerTodosLosReclamos(String token) {
        return Jwts.parser()
                .verifyWith(obtenerClaveFirma())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}

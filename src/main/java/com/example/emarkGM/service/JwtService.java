package com.example.emarkGM.service;

public interface JwtService {
    String generateToken(String email, String role);
    String extractUsername(String token);
    String extractRole(String token);
    boolean isTokenValid(String token, String email);
}

package com.example.emarkGM.service;

import com.example.emarkGM.dto.request.LoginRequest;
import com.example.emarkGM.dto.request.RegisterRequest;
import com.example.emarkGM.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse login(LoginRequest request);
    AuthResponse register(RegisterRequest request);
}

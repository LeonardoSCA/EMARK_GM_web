package com.example.emarkGM.controlador.vista;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controlador de la capa VISTA: expone las rutas amigables de la tienda
 * y las redirige a las páginas HTML almacenadas en {@code src/main/resources/vista/}.
 */
@Controller
public class ControladorVista {

    @GetMapping("/")
    public String inicio() {
        return "forward:/index.html";
    }

    @GetMapping("/inicio")
    public String paginaInicio() {
        return "forward:/index.html";
    }

    @GetMapping("/catalogo")
    public String catalogo() {
        return "forward:/catalogo.html";
    }

    @GetMapping("/cotizador")
    public String cotizador() {
        return "forward:/carrito.html";
    }

    @GetMapping("/panel-admin")
    public String panelAdmin() {
        return "forward:/admin.html";
    }
}

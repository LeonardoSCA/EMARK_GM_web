package com.example.emarkGM.vista;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuración de la capa VISTA del proyecto MVC.
 *
 * <p>La vista de Emark GM está compuesta por archivos estáticos (HTML, CSS y JavaScript)
 * ubicados en {@code src/main/resources/vista/}. Esta clase los publica en la raíz web
 * para que puedan solicitarse como {@code /index.html}, {@code /css/styles.css},
 * {@code /js/app.js} y {@code /imagenes/**}.</p>
 *
 * <p>Las rutas amigables de la tienda ({@code /catalogo}, {@code /cotizador}, ...)
 * están definidas en {@code com.example.emarkGM.controlador.vista.ControladorVista}.</p>
 */
@Configuration
public class ConfiguracionVista implements WebMvcConfigurer {

    /** Ubicación dentro del classpath donde se almacenan los recursos de la vista. */
    public static final String UBICACION_VISTAS = "classpath:/vista/";

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registro) {
        // Sirve /index.html, /css/styles.css, /js/app.js y /imagenes/** desde la carpeta vista
        registro.addResourceHandler("/**")
                .addResourceLocations(UBICACION_VISTAS);
    }
}

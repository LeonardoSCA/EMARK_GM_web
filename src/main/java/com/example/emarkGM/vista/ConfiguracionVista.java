package com.example.emarkGM.vista;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuración de la capa VISTA del proyecto MVC.
 *
 * <p>La vista de Emark GM está compuesta por archivos estáticos (HTML, CSS y JavaScript)
 * ubicados en {@code src/main/resources/vista/}. Esta clase los publica en la raíz web
 * y define las rutas amigables que apuntan a cada página de la tienda.</p>
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

    @Override
    public void addViewControllers(ViewControllerRegistry registro) {
        // Rutas amigables de la tienda hacia sus páginas HTML
        registro.addViewController("/").setViewName("forward:/index.html");
        registro.addViewController("/inicio").setViewName("forward:/index.html");
        registro.addViewController("/catalogo").setViewName("forward:/catalogo.html");
        registro.addViewController("/cotizador").setViewName("forward:/carrito.html");
        registro.addViewController("/panel-admin").setViewName("forward:/admin.html");
    }
}

package com.example.emarkGM.modelo.solicitud;

import java.math.BigDecimal;

public class SolicitudProducto {
    private String nombre;
    private BigDecimal precio;
    private Integer stock;
    private Long categoriaId;
    private String marca;
    private String maquinaria;
    private String urlImagen;
    private String descripcion;
    private String especificaciones;

    public SolicitudProducto() {}

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public BigDecimal getPrecio() { return precio; }
    public void setPrecio(BigDecimal precio) { this.precio = precio; }
    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
    public Long getCategoriaId() { return categoriaId; }
    public void setCategoriaId(Long categoriaId) { this.categoriaId = categoriaId; }
    public String getMarca() { return marca; }
    public void setMarca(String marca) { this.marca = marca; }
    public String getMaquinaria() { return maquinaria; }
    public void setMaquinaria(String maquinaria) { this.maquinaria = maquinaria; }
    public String getUrlImagen() { return urlImagen; }
    public void setUrlImagen(String urlImagen) { this.urlImagen = urlImagen; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public String getEspecificaciones() { return especificaciones; }
    public void setEspecificaciones(String especificaciones) { this.especificaciones = especificaciones; }
}

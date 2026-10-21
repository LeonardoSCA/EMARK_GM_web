package com.example.emarkGM.modelo.entidad;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Table("productos")
public class Producto {
    @Id
    private Long id;
    private String nombre;
    private BigDecimal precio;
    private Integer stock;
    @Column("categoria_id")
    private Long categoriaId;
    private String marca;
    private String maquinaria;
    @Column("url_imagen")
    private String urlImagen;
    private String descripcion;
    private String especificaciones;
    @Column("fecha_creacion")
    private LocalDateTime fechaCreacion;

    public Producto() {
        this.fechaCreacion = LocalDateTime.now();
    }

    public Producto(Long id, String nombre, BigDecimal precio, Integer stock, Long categoriaId,
                    String marca, String maquinaria, String urlImagen, String descripcion,
                    String especificaciones) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.categoriaId = categoriaId;
        this.marca = marca;
        this.maquinaria = maquinaria;
        this.urlImagen = urlImagen;
        this.descripcion = descripcion;
        this.especificaciones = especificaciones;
        this.fechaCreacion = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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

    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDateTime fechaCreacion) { this.fechaCreacion = fechaCreacion; }
}

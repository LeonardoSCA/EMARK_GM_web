package com.example.emarkGM.modelo.repositorio;

import com.example.emarkGM.modelo.entidad.Pedido;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepositorioPedido extends CrudRepository<Pedido, Long> {
    List<Pedido> findByUsuarioId(Long usuarioId);
}

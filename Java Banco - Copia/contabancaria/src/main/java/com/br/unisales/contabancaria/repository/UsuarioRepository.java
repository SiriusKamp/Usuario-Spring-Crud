package com.br.unisales.contabancaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.br.unisales.contabancaria.table.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

}

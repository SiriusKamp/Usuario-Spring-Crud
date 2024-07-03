package com.br.unisales.contabancaria.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.unisales.contabancaria.repository.UsuarioRepository;
import com.br.unisales.contabancaria.table.Usuario;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository repo;

    public List<Usuario> listar() {
        return this.repo.findAll();
    }

    public void cadastrar(Usuario usuario) {
        repo.save(usuario);
        System.out.println(usuario.getId());
    }

    public Usuario getUsuarioById(Long id) {
        Optional<Usuario> optionalUsuario = this.repo.findById(id);
        return optionalUsuario.orElse(null);
    }

    public void excluir(Long id) {
        repo.deleteById(id);
    }

    public void editar(Usuario usuario) {
        Optional<Usuario> optionalUsuario = repo.findById(usuario.getId());
        if (optionalUsuario.isPresent()) {
            Usuario usuarioExistente = optionalUsuario.get();
            usuarioExistente.setNome(usuario.getNome());
            usuarioExistente.setSexo(usuario.getSexo());
            usuarioExistente.setEmail(usuario.getEmail());
            usuarioExistente.setSenha(usuario.getSenha());
            repo.save(usuarioExistente);
        } else {
            throw new RuntimeException("Usuário não encontrado");
        }
    }

}

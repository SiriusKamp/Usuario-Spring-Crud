package com.br.unisales.contabancaria.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.br.unisales.contabancaria.service.UsuarioService;
import com.br.unisales.contabancaria.table.Usuario;
@Controller
public class CadastroUsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/cadastro")
    @ResponseBody
    public String cadastrarUsuario(@RequestBody Usuario usuario) {
        usuarioService.cadastrar(usuario);
        return "Usuário cadastrado com sucesso!";
    }

    @PutMapping("/usuario/editarUsuario")
    @ResponseBody
    public String editarUsuario(@RequestBody Usuario usuario) {
        try {
            usuarioService.editar(usuario);
            return "Usuário editado com sucesso!";
        } catch (Exception e) {
            return "Erro ao editar usuário: " + e.getMessage();
        }
    }


    @GetMapping("/usuario/{id}")
    @ResponseBody
    public Usuario getUsuario(@PathVariable Long id) {
        return usuarioService.getUsuarioById(id);
    }

    @DeleteMapping("/usuario/{id}")
    @ResponseBody
    public String excluirUsuario(@PathVariable Long id) {
        usuarioService.excluir(id);
        return "Usuário excluído com sucesso!";
    }
}

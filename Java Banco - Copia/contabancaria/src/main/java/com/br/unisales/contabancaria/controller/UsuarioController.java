package com.br.unisales.contabancaria.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import com.br.unisales.contabancaria.service.UsuarioService;
import com.br.unisales.contabancaria.table.Usuario;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UsuarioController {
    @Autowired
    private UsuarioService service;

    @PostMapping("/listarUsuario")
    public ResponseEntity<List<Usuario>> listarUsuario(HttpServletRequest request) {
        return ResponseEntity.status(HttpStatus.OK).body(this.service.listar());
    }

    /*@PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestParam("email") String email, @RequestParam("senha") String senha,
            HttpServletRequest request) {
        Usuario modelo = this.servico.login(email, senha);
        if ((modelo != null) && (modelo.getId() != null)) {
            modelo.setToken(this.criarToken().toString());
            request.getSession().setAttribute("usuario", modelo);
            return ResponseEntity.status(HttpStatus.OK).body(modelo);
        }
        /*
         * JSONObject json = new JSONObject();
         * json.put("menssagem", "Usuário não encontrado no sistema!");
         */
       /* return ResponseEntity.status(HttpStatus.FOUND).body(new UsuarioModel());
    }*/

    /*private UUID criarToken() {
        String chave = "Sistem de micro servico login";
        Charset charset = Charset.forName("ASCII");
        byte[] byteArrray = chave.getBytes(charset);
        return UUID.nameUUIDFromBytes(byteArrray);
    }*/
}

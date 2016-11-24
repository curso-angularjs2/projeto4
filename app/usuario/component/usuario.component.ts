import { Component, OnInit } from '@angular/core';
import { Usuario } from '../class/usuario';
import { UsuarioService } from '../service/usuario.service';


@Component({
    selector: 'usuario-component',
    templateUrl: 'app/usuario/templates/usuario.template.html',
    providers: [UsuarioService]
})
export class UsuarioComponent implements OnInit {
    usuarios: Usuario[];
    usuarioObject = new Usuario();
    edit = false;

    constructor(private usuarioService: UsuarioService) {

    }

    getListUsuarios(): void {
        this.usuarioService.getListUsuario().then(usuarios => this.usuarios = usuarios);
    }

    deletarUsuario(index): void {
        this.usuarios.splice(index, 1);
    }

    salvarUsuario(usuario): void {
        this.usuarios.push(usuario);
        this.usuarioObject = new Usuario();
    }

    editarUsuario(usuario, persistir = false): void {
        this.edit = true;
        this.usuarioObject = usuario;
        if (persistir) {
            this.usuarioObject = new Usuario();
            this.edit = false;
        }
    }

    ngOnInit(): void {
        this.getListUsuarios();
    }

}
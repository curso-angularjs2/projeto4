
import { Injectable } from '@angular/core';
import { Usuario } from '../class/usuario';
import { USUARIOS } from '../mock/mock.usuarios';


@Injectable()
export class UsuarioService {
    
    getListUsuario(): Promise<Usuario[]> {
        return Promise.resolve(USUARIOS);
    }
    
}
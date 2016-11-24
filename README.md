# Estruturando melhor o nosso projeto e utilizando Services.

Agora nós vamos estruturar melhor o nosso projeto, você com certeza reparou que quando o TypeScript é compilado ele gera mais dois arquivos para cada arquivo que fizemos, um .js e outro .map então é essencial que estruturemos o nosso projeto de uma forma com que ele fique bem manutenível.


Agora vamos criar os arquivos que continuarão na raiz que são o tsconfig.json

* projeto4/tsconfig.json

~~~json
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "moduleResolution": "node",
        "sourceMap": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "removeComments": false,
        "noImplicitAny": false
    }
}

~~~

* projeto4/package.json

~~~json
{
  "name": "projeto4",
  "version": "1.0.0",
  "scripts": {
    "start": "tsc && concurrently \"tsc -w\" \"lite-server\" ",
    "lite": "lite-server",
    "tsc": "tsc",
    "tsc:w": "tsc -w"
  },
  "licenses": [
    {
      "type": "MIT",
      "url": "https://github.com/angular/angular.io/blob/master/LICENSE"
    }
  ],
  "dependencies": {
    "@angular/common": "~2.2.0",
    "@angular/compiler": "~2.2.0",
    "@angular/core": "~2.2.0",
    "@angular/forms": "~2.2.0",
    "@angular/http": "~2.2.0",
    "@angular/platform-browser": "~2.2.0",
    "@angular/platform-browser-dynamic": "~2.2.0",
    "@angular/router": "~3.2.0",
    "@angular/upgrade": "~2.2.0",
    "angular-in-memory-web-api": "~0.1.15",
    "core-js": "^2.4.1",
    "reflect-metadata": "^0.1.8",
    "rxjs": "5.0.0-beta.12",
    "systemjs": "0.19.39",
    "zone.js": "^0.6.25",
    "debug": "~2.0.0",
    "express": "~4.9.0"
  },
  "devDependencies": {
    "@types/core-js": "^0.9.34",
    "@types/node": "^6.0.45",
    "concurrently": "^3.0.0",
    "lite-server": "^2.2.2",
    "typescript": "^2.0.3"
  }
}

~~~


* projeto4/systemjs.config.js

~~~javascript

(function (global) {
  System.config({
    paths: {
      // Caminho das suas libs baixadas pelo npm
      'npm:': 'node_modules/'
    },
    // atributo onde carrega as libs necessárias
    map: {
      //pasta onde a aplicação funciona
      app: 'app',
      // angular
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
      // outras libs
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
    },
    // pacotes necessários
    packages: {
      app: {
        main: 'config/main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });
})(this);


~~~

Agora dentro da pasta app vamos criar uma outra pasta chamada config e dentro dela vamos colocar todos os nossos arquivos de configuração.
Primeiro vamos criar o nosso main.ts

* projeto4/app/config/main.ts

~~~javascript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './module/app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);

~~~

Dentro da pasta config vamos criar a nossa pasta module para colocarmos o nosso módulo.

* projeto4/app/config/module/app.module.ts

~~~javascript
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }   from './../component/app.component';
@NgModule({
  imports:      [
    BrowserModule,
    FormsModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
~~~

Agora também criaremos uma pasta component e dentro dela vamos criar nosso component principal

* projeto4/component/app.component.ts

~~~javascript
import { Component } from '@angular/core';


@Component({
    selector:'projeto4',
    template:`
        <usuario-component></usuario-component>
    `
})

export class AppComponent{
    
}
~~~

Agora vamos criar uma pasta usuario dentro da pasta app, nela criaremos três pastas:
projeto4/app/usuario/component, projeto4/app/usuario/templates, projeto4/app/usuario/service e
 projeto4/app/usuario/class.

Primeiro vamos criar a nossa classe Usuario.

* projeto4/app/usuario/class/usuario.ts

~~~javascript
export class Usuario {
  id: number;
  nome: string;
  idade:number;
}
~~~


Agora vamos criar o usuario.component.ts

* projeto4/app/usuario/component/usuario.component.ts

~~~javascript
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
~~~

Repare que agora importamos um Service para nossa classe UsuarioComponent, agora precisamos criar esse Service utilizando o @Injectable
O código do nosso Service será conforme o código abaixo:

* projeto4/app/service/usuario.service.ts


~~~javascript

import { Injectable } from '@angular/core';
import { Usuario } from '../class/usuario';
import { USUARIOS } from '../mock/mock.usuarios';


@Injectable()
export class UsuarioService {
    
    getListUsuario(): Promise<Usuario[]> {
        return Promise.resolve(USUARIOS);
    }
    
}
~~~

Repare que criamos um mock de usuários para criar uma lista em json, agora precisamos criar esse arquivo de mock

* projeto4/app/usuario/mock/mock.usuarios.ts

~~~javascript
import { Usuario } from './../class/usuario';

export const USUARIOS: Usuario[] = [
    { id: 11, nome: 'João', idade: 20 },
    { id: 12, nome: 'Maria', idade: 24 },
    { id: 13, nome: 'Joana', idade: 29 },
    { id: 14, nome: 'José', idade: 60 },
    { id: 15, nome: 'Magneta', idade: 89 },
    { id: 16, nome: 'RubberMan', idade: 21 },
    { id: 17, nome: 'Dynama', idade: 29 },
    { id: 18, nome: 'Dr IQ', idade: 26 },
    { id: 19, nome: 'Nataniel', idade: 25 },
    { id: 20, nome: 'Jéssica', idade: 23 }
];


~~~

Agora pronto! Falta apenas nós criarmos o nosso template em html, pois retiramos o mesmo de dentro do nosso usuario.component.ts na seguinte linha:

templateUrl: 'app/usuario/templates/usuario.template.html'.
Agora nós importamos um arquivo externo em HTML e será bem simples criá-lo, veja o código abaixo:

* projeto4/app/usuario/templates/usuario.template.html

~~~html
<h2>Exemplo de usuários</h2>
<div class="form-group col-md-4">
    <label>Id</label>
    <input type="number" class="form-control" [(ngModel)]="usuarioObject.id"   />
</div>
<div class="form-group col-md-4">
    <label>Nome</label>
    <input type="text" class="form-control" [(ngModel)]="usuarioObject.nome"   />
</div>
<div class="form-group col-md-4">
    <label>Idade</label>
    <input type="number" class="form-control" [(ngModel)]="usuarioObject.idade"   />
</div>
<div *ngIf="!edit" class="form-group col-md-3">
    <button class="btn btn-primary" (click)="salvarUsuario(usuarioObject)">Salvar</button>
</div>
<div *ngIf="edit" class="form-group col-md-3">
    <button class="btn btn-primary" (click)="editarUsuario(usuarioObject, true)">Editar</button>
</div>
<table class="table">
    <tr>
        <th>
            Id
        </th>
        <th>
            Nome
        </th>
        <th>
            Idade
        </th>
        <th>

        </th>
        <th>

        </th>
    </tr>

    <tr *ngFor="let usuario of usuarios; let i = index">
        <td>
            {{usuario.id}}
        </td>
        <td>
            {{usuario.nome}}
        </td>
        <td>
            {{usuario.idade}}
        </td>
        <td>
            <button class="btn btn-primary" (click)=editarUsuario(usuario)>Editar</button>
        </td>
        <td>
            <button class="btn btn-danger" (click)=deletarUsuario(i)>Deletar</button>
        </td>
    </tr>
</table>

~~~

Pronto! Agora nós temos o mesmo CRUD, só que agora estamos utilizando o Service.
Além de estruturar melhor o nosso projeto, com isso será bem simples utilizarmos o AngularJS para consumir algum serviço Rest que é o nosso assunto para o próximo projeto!










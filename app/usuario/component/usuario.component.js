"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var usuario_1 = require('../class/usuario');
var usuario_service_1 = require('../service/usuario.service');
var UsuarioComponent = (function () {
    function UsuarioComponent(usuarioService) {
        this.usuarioService = usuarioService;
        this.usuarioObject = new usuario_1.Usuario();
        this.edit = false;
    }
    UsuarioComponent.prototype.getListUsuarios = function () {
        var _this = this;
        this.usuarioService.getListUsuario().then(function (usuarios) { return _this.usuarios = usuarios; });
    };
    UsuarioComponent.prototype.deletarUsuario = function (index) {
        this.usuarios.splice(index, 1);
    };
    UsuarioComponent.prototype.salvarUsuario = function (usuario) {
        this.usuarios.push(usuario);
        this.usuarioObject = new usuario_1.Usuario();
    };
    UsuarioComponent.prototype.editarUsuario = function (usuario, persistir) {
        if (persistir === void 0) { persistir = false; }
        this.edit = true;
        this.usuarioObject = usuario;
        if (persistir) {
            this.usuarioObject = new usuario_1.Usuario();
            this.edit = false;
        }
    };
    UsuarioComponent.prototype.ngOnInit = function () {
        this.getListUsuarios();
    };
    UsuarioComponent = __decorate([
        core_1.Component({
            selector: 'usuario-component',
            templateUrl: 'app/usuario/templates/usuario.template.html',
            providers: [usuario_service_1.UsuarioService]
        }), 
        __metadata('design:paramtypes', [usuario_service_1.UsuarioService])
    ], UsuarioComponent);
    return UsuarioComponent;
}());
exports.UsuarioComponent = UsuarioComponent;
//# sourceMappingURL=usuario.component.js.map
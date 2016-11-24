import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './../component/app.component';
import { UsuarioComponent } from '../../usuario/component/usuario.component';
import { UsuarioService } from '../../usuario/service/usuario.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        UsuarioComponent
    ],
    providers:[
        UsuarioService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

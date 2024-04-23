import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ProductosComponent } from './productos/productos.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [
    AppComponent,
    CategoriaComponent,
    ProductosComponent,
    UsuarioComponent,
    MenuComponent
    // Remove AppComponent from declarations array
  ],
  imports: [
    BrowserModule,
    // Add AppComponent to imports array



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

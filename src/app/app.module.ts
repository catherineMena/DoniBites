import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ProductosComponent } from './productos/productos.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { MenuComponent } from './menu/menu.component';
import { AgregarCategoriaComponent } from './Add/agregar-categoria/agregar-categoria.component';
import { AgregarProductoComponent } from './Add/agregar-producto/agregar-producto.component';
import { VisualizarCategoriaComponent } from './read/visualizar-categoria/visualizar-categoria.component';



@NgModule({
  declarations: [
    AppComponent,
    CategoriaComponent,
    ProductosComponent,
    UsuarioComponent,
    MenuComponent,
    AgregarCategoriaComponent,
    AgregarProductoComponent,
    VisualizarCategoriaComponent

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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ProductosComponent } from './productos/productos.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { MenuComponent } from './menu/menu.component';
import { AgregarCategoriaComponent } from './Add/agregar-categoria/agregar-categoria.component';
import { AgregarProductoComponent } from './Add/agregar-producto/agregar-producto.component';
import { VisualizarCategoriaComponent } from './read/visualizar-categoria/visualizar-categoria.component';
import { EliminarCategoriaComponent } from './delete/eliminar-categoria/eliminar-categoria.component';
import { VisualizarProductosComponent } from './read/visualizar-productos/visualizar-productos.component';
import { ActualizarCategoriaComponent } from './update/actualizar-categoria/actualizar-categoria.component';
import { ActualizarProductoComponent } from './update/actualizar-producto/actualizar-producto.component';
import { EliminarProductosComponent } from './delete/eliminar-productos/eliminar-productos.component';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './app.routes';
import { AgregarUsuarioComponent } from './Add/agregar-usuario/agregar-usuario.component';
import { VisualizarUsuarioComponent } from './read/visualizar-usuario/visualizar-usuario.component';
import { EliminarUsuarioComponent } from './delete/eliminar-usuario/eliminar-usuario.component';
import { ActualizarUsuarioComponent } from './update/actualizar-usuario/actualizar-usuario.component';

import { CategoriaService } from './services/categoria.service';


@NgModule({
  declarations: [
    AppComponent,
    CategoriaComponent,
    ProductosComponent,
    UsuarioComponent,
    MenuComponent,
    AgregarCategoriaComponent,
    AgregarProductoComponent,
    VisualizarCategoriaComponent,
    EliminarCategoriaComponent,
    VisualizarProductosComponent,
    ActualizarCategoriaComponent,
    ActualizarProductoComponent,
    EliminarProductosComponent,
    AgregarUsuarioComponent,
    VisualizarUsuarioComponent,
    EliminarUsuarioComponent,
    ActualizarUsuarioComponent,
    

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    // Add AppComponent to imports array



  ],
  providers: [
    CategoriaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { EliminarCategoriaComponent } from './delete/eliminar-categoria/eliminar-categoria.component';
import { VisualizarProductosComponent } from './read/visualizar-productos/visualizar-productos.component';
import { ActualizarCategoriaComponent } from './update/actualizar-categoria/actualizar-categoria.component';
import { ActualizarProductoComponent } from './update/actualizar-producto/actualizar-producto.component';
import { EliminarProductosComponent } from './delete/eliminar-productos/eliminar-productos.component';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './app.routes';



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
    EliminarProductosComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    // Add AppComponent to imports array



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

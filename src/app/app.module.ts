import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ProductoComponent } from './producto/producto.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { MenuComponent } from './menu/menu.component';
import { AgregarCategoriaComponent } from './Add/agregar-categoria/agregar-categoria.component';
import { AgregarProductoComponent } from './Add/agregar-producto/agregar-producto.component';
import { VisualizarCategoriaComponent } from './read/visualizar-categoria/visualizar-categoria.component';
import { EliminarCategoriaComponent } from './delete/eliminar-categoria/eliminar-categoria.component';
import { VisualizarProductoComponent } from './read/visualizar-producto/visualizar-producto.component';
import { ActualizarCategoriaComponent } from './update/actualizar-categoria/actualizar-categoria.component';
import { ActualizarProductoComponent } from './update/actualizar-producto/actualizar-producto.component';
import { EliminarProductoComponent } from './delete/eliminar-producto/eliminar-producto.component';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './app.routes';
import { AgregarUsuarioComponent } from './Add/agregar-usuario/agregar-usuario.component';
import { VisualizarUsuarioComponent } from './read/visualizar-usuario/visualizar-usuario.component';
import { EliminarUsuarioComponent } from './delete/eliminar-usuario/eliminar-usuario.component';
import { ActualizarUsuarioComponent } from './update/actualizar-usuario/actualizar-usuario.component';

import { CategoriaService } from './services/categoria.service';
import { ProductoService } from './services/producto.service';
import { UsuarioService } from './services/usuario.service';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { ProveedoresService } from './services/proveedores.service';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { AgregarProveedorComponent } from './Add/agregar-proveedor/agregar-proveedor.component';
import { VisualizarProveedorComponent } from './read/visualizar-proveedor/visualizar-proveedor.component';
import { ActualizarProveedorComponent } from './update/actualizar-proveedor/actualizar-proveedor.component';
import { EliminarProveedorComponent } from './delete/eliminar-proveedor/eliminar-proveedor.component';
import { RecuperarPwdComponent } from './recuperar-pwd/recuperar-pwd.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriaComponent,
    ProductoComponent,
    UsuarioComponent,
    MenuComponent,
    LoginComponent,
    ProductoComponent,
    ProveedoresComponent,
    AgregarProveedorComponent,
    AgregarCategoriaComponent,
    AgregarProductoComponent,
    VisualizarCategoriaComponent,
    EliminarCategoriaComponent,
    ActualizarCategoriaComponent,
    ActualizarProductoComponent,
    EliminarProductoComponent,
    AgregarUsuarioComponent,
    VisualizarUsuarioComponent,
    EliminarUsuarioComponent,
    ActualizarUsuarioComponent,
    VisualizarProductoComponent,
    VisualizarProveedorComponent,
    ActualizarProveedorComponent,
    EliminarProveedorComponent,
    RecuperarPwdComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    // Add AppComponent to imports array



  ],

  exports: [RouterModule],

  providers: [
    CategoriaService,
    ProductoService,
    UsuarioService,
    AuthenticationService,
    ProveedoresService
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }

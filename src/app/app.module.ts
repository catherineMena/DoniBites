import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AgregarCategoriaComponent } from './Add/agregar-categoria/agregar-categoria.component';
import { AgregarProductoComponent } from './Add/agregar-producto/agregar-producto.component';
import { AgregarUsuarioComponent } from './Add/agregar-usuario/agregar-usuario.component';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { CategoriaComponent } from './categoria/categoria.component';
import { EliminarCategoriaComponent } from './delete/eliminar-categoria/eliminar-categoria.component';
import { EliminarProductoComponent } from './delete/eliminar-producto/eliminar-producto.component';
import { EliminarUsuarioComponent } from './delete/eliminar-usuario/eliminar-usuario.component';
import { MenuComponent } from './menu/menu.component';
import { ProductoComponent } from './producto/producto.component';
import { VisualizarCategoriaComponent } from './read/visualizar-categoria/visualizar-categoria.component';
import { VisualizarProductoComponent } from './read/visualizar-producto/visualizar-producto.component';
import { VisualizarUsuarioComponent } from './read/visualizar-usuario/visualizar-usuario.component';
import { ActualizarCategoriaComponent } from './update/actualizar-categoria/actualizar-categoria.component';
import { ActualizarProductoComponent } from './update/actualizar-producto/actualizar-producto.component';
import { ActualizarUsuarioComponent } from './update/actualizar-usuario/actualizar-usuario.component';
import { UsuarioComponent } from './usuario/usuario.component';

import { FormsModule } from '@angular/forms';
import { AgregarProveedorComponent } from './Add/agregar-proveedor/agregar-proveedor.component';
import { AgregarRolComponent } from './Add/agregar-rol/agregar-rol.component';
import { EliminarProveedorComponent } from './delete/eliminar-proveedor/eliminar-proveedor.component';
import { EliminarRolComponent } from './delete/eliminar-rol/eliminar-rol.component';
import { IngredientesComponent } from './ingredientes/ingredientes.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { VisualizarProveedorComponent } from './read/visualizar-proveedor/visualizar-proveedor.component';
import { VisualizarRolComponent } from './read/visualizar-rol/visualizar-rol.component';
import { RecuperarPwdComponent } from './recuperar-pwd/recuperar-pwd.component';
import { RolComponent } from './rol/rol.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ActualizarProveedorComponent } from './update/actualizar-proveedor/actualizar-proveedor.component';
import { ActualizarRolComponent } from './update/actualizar-rol/actualizar-rol.component';
import { HttpInterceptorService } from './services/httpInterceptor.service';




@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CategoriaComponent,
    NavbarComponent,
    ProductoComponent,
    UsuarioComponent,
    MenuComponent,
    IngredientesComponent,
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
    RolComponent,
    AgregarRolComponent,
    VisualizarRolComponent,
    ActualizarRolComponent,
    EliminarRolComponent,



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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }

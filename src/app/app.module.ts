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
import { AddIncomingStockComponent } from './Add/add-incoming-stock/add-incoming-stock.component';
import { AddIngredientComponent } from './Add/add-ingredient/add-ingredient.component';
import { AgregarFacturaComponent } from './Add/agregar-factura/agregar-factura.component';
import { AgregarPedidoComponent } from './Add/agregar-pedido/agregar-pedido.component';
import { AgregarProveedorComponent } from './Add/agregar-proveedor/agregar-proveedor.component';
import { AgregarRolComponent } from './Add/agregar-rol/agregar-rol.component';
import { DeleteIngredientComponent } from './delete/delete-ingredient/delete-ingredient.component';
import { EliminarProveedorComponent } from './delete/eliminar-proveedor/eliminar-proveedor.component';
import { EliminarRolComponent } from './delete/eliminar-rol/eliminar-rol.component';
import { FacturaComponent } from './factura/factura.component';
import { IncomingStockComponent } from './incoming-stock/incoming-stock.component';
import { IngredientesComponent } from './ingredientes/ingredientes.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ReadIncomingStockComponent } from "./read/read-incoming-stock/read-incoming-stock.component";
import { ReadIngredientComponent } from './read/read-ingredient/read-ingredient.component';
import { VisualizarFacturaComponent } from './read/visualizar-factura/visualizar-factura.component';
import { VisualizarPedidoComponent } from './read/visualizar-pedido/visualizar-pedido.component';
import { VisualizarProveedorComponent } from './read/visualizar-proveedor/visualizar-proveedor.component';
import { VisualizarRolComponent } from './read/visualizar-rol/visualizar-rol.component';
import { RecuperarPwdComponent } from './recuperar-pwd/recuperar-pwd.component';
import { RolComponent } from './rol/rol.component';
import { HttpInterceptorService } from './services/httpInterceptor.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ActualizarFacturaComponent } from './update/actualizar-factura/actualizar-factura.component';
import { ActualizarPedidoComponent } from './update/actualizar-pedido/actualizar-pedido.component';
import { ActualizarProveedorComponent } from './update/actualizar-proveedor/actualizar-proveedor.component';
import { ActualizarRolComponent } from './update/actualizar-rol/actualizar-rol.component';
import { UpdateIngredientComponent } from './update/update-ingredient/update-ingredient.component';

import { EliminarFacturaComponent } from './delete/eliminar-factura/eliminar-factura.component';
import { EliminarPedidoComponent } from './delete/eliminar-pedidos/eliminar-pedidos.component';


import { AgregarOutgoingComponent } from './Add/agregar-outgoings/agregar-outgoings.component';
import { EliminarOutgoingsComponent } from './delete/eliminar-outgoings/eliminar-outgoings.component';
import { OutgoingsComponent } from './outgoings/outgoings.component';
import { VisualizarOutgoingsComponent } from './read/visualizar-outgoings/visualizar-outgoings.component';
import { ActualizarOutgoingsComponent } from './update/actualizar-outgoings/actualizar-outgoings.component';


import { WidgetsComponent } from './widgets/widgets.component';


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
    UpdateIngredientComponent,
    AddIngredientComponent,
    DeleteIngredientComponent,
    ReadIngredientComponent,
    IncomingStockComponent,
    AddIncomingStockComponent,
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
    FacturaComponent,
    AgregarFacturaComponent,
    VisualizarFacturaComponent,
    ActualizarFacturaComponent,
    EliminarCategoriaComponent,
    EliminarRolComponent,
    PedidoComponent,
    AgregarPedidoComponent,
    VisualizarPedidoComponent,
    ActualizarPedidoComponent,
    EliminarPedidoComponent,
    OutgoingsComponent,
    ActualizarOutgoingsComponent,
    VisualizarOutgoingsComponent,
    EliminarOutgoingsComponent,
    AgregarOutgoingComponent,
    EliminarFacturaComponent,
    EliminarRolComponent,
    WidgetsComponent,    RecuperarPwdComponent





  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReadIncomingStockComponent
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

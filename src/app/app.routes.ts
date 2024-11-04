import { Routes } from '@angular/router';
import { AgregarCategoriaComponent } from './Add/agregar-categoria/agregar-categoria.component';
import { AgregarFacturaComponent } from './Add/agregar-factura/agregar-factura.component';
import { AgregarPedidoComponent } from './Add/agregar-pedido/agregar-pedido.component';
import { AgregarProductoComponent } from './Add/agregar-producto/agregar-producto.component';
import { AgregarProveedorComponent } from './Add/agregar-proveedor/agregar-proveedor.component';
import { AgregarRolComponent } from './Add/agregar-rol/agregar-rol.component';
import { AgregarUsuarioComponent } from './Add/agregar-usuario/agregar-usuario.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { EliminarCategoriaComponent } from './delete/eliminar-categoria/eliminar-categoria.component';
import { EliminarProductoComponent } from './delete/eliminar-producto/eliminar-producto.component';
import { EliminarProveedorComponent } from './delete/eliminar-proveedor/eliminar-proveedor.component';
import { EliminarRolComponent } from './delete/eliminar-rol/eliminar-rol.component';
import { EliminarUsuarioComponent } from './delete/eliminar-usuario/eliminar-usuario.component';
import { FacturaComponent } from './factura/factura.component';
import { IngredientesComponent } from './ingredientes/ingredientes.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ProductoComponent } from './producto/producto.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { VisualizarCategoriaComponent } from './read/visualizar-categoria/visualizar-categoria.component';
import { VisualizarFacturaComponent } from './read/visualizar-factura/visualizar-factura.component';
import { VisualizarPedidoComponent } from './read/visualizar-pedido/visualizar-pedido.component';
import { VisualizarProductoComponent } from './read/visualizar-producto/visualizar-producto.component';
import { VisualizarProveedorComponent } from './read/visualizar-proveedor/visualizar-proveedor.component';
import { VisualizarRolComponent } from './read/visualizar-rol/visualizar-rol.component';
import { VisualizarUsuarioComponent } from './read/visualizar-usuario/visualizar-usuario.component';
import { RecuperarPwdComponent } from './recuperar-pwd/recuperar-pwd.component';
import { RolComponent } from './rol/rol.component';
import { ActualizarCategoriaComponent } from './update/actualizar-categoria/actualizar-categoria.component';
import { ActualizarFacturaComponent } from './update/actualizar-factura/actualizar-factura.component';
import { ActualizarPedidoComponent } from './update/actualizar-pedido/actualizar-pedido.component';
import { ActualizarProductoComponent } from './update/actualizar-producto/actualizar-producto.component';
import { ActualizarProveedorComponent } from './update/actualizar-proveedor/actualizar-proveedor.component';
import { ActualizarRolComponent } from './update/actualizar-rol/actualizar-rol.component';
import { ActualizarUsuarioComponent } from './update/actualizar-usuario/actualizar-usuario.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { IncomingStockComponent } from './incoming-stock/incoming-stock.component';
import { ReadIncomingStockComponent } from './read/read-incoming-stock/read-incoming-stock.component';
import { AddIncomingStockComponent } from './Add/add-incoming-stock/add-incoming-stock.component';


 export const appRoutes: Routes = [

  { path: 'menu', component: MenuComponent },
  /////////////////////////////////////////////////////////////////////
  { path: 'producto', component: ProductoComponent },
  { path: 'agregar-producto', component: AgregarProductoComponent },
  { path: 'visualizar-producto/:id', component: VisualizarProductoComponent },
  { path: 'actualizar-producto/:id', component: ActualizarProductoComponent },
  { path: 'eliminar-producto/:id', component: EliminarProductoComponent },

  /////////////////////////////////////////////////////////////////////
  { path: 'categoria', component: CategoriaComponent },
  { path: 'agregar-categoria', component: AgregarCategoriaComponent },
  { path: 'visualizar-categoria', component: VisualizarCategoriaComponent },
  { path: 'actualizar-categoria', component: ActualizarCategoriaComponent},
  { path: 'eliminar-categoria', component: EliminarCategoriaComponent},

  { path: 'visualizar-categoria/:id', component: VisualizarCategoriaComponent },
  { path: 'actualizar-categoria/:id', component: ActualizarCategoriaComponent },
  { path: 'eliminar-categoria/:id', component: EliminarCategoriaComponent },

   /////////////////////////////////////////////////////////////////////
  { path: 'usuario', component: UsuarioComponent },
  { path: 'agregar-usuario', component: AgregarUsuarioComponent },
  { path: 'visualizar-usuario', component: VisualizarUsuarioComponent},
  { path: 'actualizar-usuario', component: ActualizarUsuarioComponent},
  { path: 'eliminar-usuario', component: EliminarUsuarioComponent},
  { path: 'visualizar-usuario/:id', component: VisualizarUsuarioComponent},
  { path: 'actualizar-usuario/:id', component: ActualizarUsuarioComponent},
  { path: 'eliminar-usuario/:id', component: EliminarUsuarioComponent},
///////////////////////////////////////////////////////////////////
  // {path:'login', component: LoginComponent},


  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'agregar-proveedor', component: AgregarProveedorComponent },

  { path: 'visualizar-proveedor', component: VisualizarProveedorComponent},
  { path: 'actualizar-proveedor', component: ActualizarProveedorComponent},
  { path: 'eliminar-proveedor', component: EliminarProveedorComponent},
  { path: 'visualizar-proveedor/:id', component: VisualizarProveedorComponent},
  { path: 'actualizar-proveedor/:id', component: ActualizarProveedorComponent},
  { path: 'eliminar-proveedor/:id', component: EliminarProveedorComponent},

///////////////////////////////////////////////////////////////////

{ path: 'roles', component: RolComponent },
{ path: 'agregar-rol', component: AgregarRolComponent },
{ path: 'visualizar-rol', component: VisualizarRolComponent },
{ path: 'actualizar-rol', component: ActualizarRolComponent },
{ path: 'eliminar-rol', component: EliminarRolComponent },
{ path: 'visualizar-rol/:id', component: VisualizarRolComponent },
{ path: 'actualizar-rol/:id', component: ActualizarRolComponent },
{ path: 'eliminar-rol/:id', component: EliminarRolComponent },

{ path: 'pedido', component: PedidoComponent },
{ path: 'agregar-pedido', component: AgregarPedidoComponent },
{ path: 'visualizar-pedido', component: VisualizarPedidoComponent },
{ path: 'actualizar-pedido', component: ActualizarPedidoComponent },
// { path: 'eliminar-pedido', component: EliminarPedidoComponent },
{ path: 'visualizar-pedido/:id', component: VisualizarPedidoComponent },
{ path: 'actualizar-pedido/:id', component: ActualizarPedidoComponent },
// { path: 'eliminar-pedido/:id', component: EliminarPedidoComponent },

  ///////////////////////////////////////////////////////////////////
  { path: 'factura', component: FacturaComponent },
  { path: 'agregar-factura', component: AgregarFacturaComponent },
  { path: 'visualizar-factura', component: VisualizarFacturaComponent },
  { path: 'actualizar-factura', component: ActualizarFacturaComponent },
  // { path: 'eliminar-factura', component: EliminarFacturaComponent },
  { path: 'visualizar-factura/:id', component: VisualizarFacturaComponent },
  { path: 'actualizar-factura/:id', component: ActualizarFacturaComponent },
  // { path: 'eliminar-factura/:id', component: EliminarFacturaComponent },

///////////////////////////////////////////////////////////////////////////

  {path: 'ingredient', component: IngredientesComponent},
  {path:'add-ingredient', component: AgregarProductoComponent},
  {path:'view-ingredient/:id', component: VisualizarProductoComponent},
  {path:'update-ingredient/:id', component: ActualizarProductoComponent},
  {path:'delete-ingredient/:id', component: EliminarProductoComponent},
/////////////////////////////////////////////////////////////////////////////

{path:'incoming-stock', component: IncomingStockComponent},
{path:'view-stock/:id',component:ReadIncomingStockComponent},
{path:'add-stock',component:AddIncomingStockComponent},
///////////////////////////////////////////////////////////////////
{ path: 'login', component: LoginComponent },
{ path: 'dashboard', component: MenuComponent },
{ path: 'recuperar-pwd', component: RecuperarPwdComponent },

{path: 'logout', component: LoginComponent},

{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: '**', redirectTo: '/login' },

  // Agrega aquí más rutas según sea necesario
];

import { Routes } from '@angular/router';
import { AgregarCategoriaComponent } from './Add/agregar-categoria/agregar-categoria.component';
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
import { IngredientesComponent } from './ingredientes/ingredientes.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ProductoComponent } from './producto/producto.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { VisualizarCategoriaComponent } from './read/visualizar-categoria/visualizar-categoria.component';
import { VisualizarProductoComponent } from './read/visualizar-producto/visualizar-producto.component';
import { VisualizarProveedorComponent } from './read/visualizar-proveedor/visualizar-proveedor.component';
import { VisualizarRolComponent } from './read/visualizar-rol/visualizar-rol.component';
import { VisualizarUsuarioComponent } from './read/visualizar-usuario/visualizar-usuario.component';
import { RecuperarPwdComponent } from './recuperar-pwd/recuperar-pwd.component';
import { RolComponent } from './rol/rol.component';
import { ActualizarCategoriaComponent } from './update/actualizar-categoria/actualizar-categoria.component';
import { ActualizarProductoComponent } from './update/actualizar-producto/actualizar-producto.component';
import { ActualizarProveedorComponent } from './update/actualizar-proveedor/actualizar-proveedor.component';
import { ActualizarRolComponent } from './update/actualizar-rol/actualizar-rol.component';
import { ActualizarUsuarioComponent } from './update/actualizar-usuario/actualizar-usuario.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AddIngredientComponent } from './Add/add-ingredient/add-ingredient.component';
import { ReadIngredientComponent } from './read/read-ingredient/read-ingredient.component';
import { DeleteIngredientComponent } from './delete/delete-ingredient/delete-ingredient.component';
import { UpdateIngredientComponent } from './update/update-ingredient/update-ingredient.component';
import { IncomingStockComponent } from './incoming-stock/incoming-stock.component';
import { ReadIncomingStockComponent } from './read/read-incoming-stock/read-incoming-stock.component';
import { AddIncomingStockComponent } from './Add/add-incoming-stock/add-incoming-stock.component';
import { SidebarComponent } from './sidebar/sidebar.component';

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
  { path: 'visualizar-categoria/:id', component: VisualizarCategoriaComponent },
  { path: 'actualizar-categoria/:id', component: ActualizarCategoriaComponent },
  { path: 'eliminar-categoria/:id', component: EliminarCategoriaComponent },

  /////////////////////////////////////////////////////////////////////
  { path: 'usuario', component: UsuarioComponent },
  { path: 'agregar-usuario', component: AgregarUsuarioComponent },
  { path: 'visualizar-usuario', component: VisualizarUsuarioComponent },
  { path: 'actualizar-usuario', component: ActualizarUsuarioComponent },
  { path: 'eliminar-usuario', component: EliminarUsuarioComponent },
  { path: 'visualizar-usuario/:id', component: VisualizarUsuarioComponent },
  { path: 'actualizar-usuario/:id', component: ActualizarUsuarioComponent },
  { path: 'eliminar-usuario/:id', component: EliminarUsuarioComponent },
  ///////////////////////////////////////////////////////////////////

  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'agregar-proveedor', component: AgregarProveedorComponent },
  { path: 'visualizar-proveedor', component: VisualizarProveedorComponent },
  { path: 'actualizar-proveedor', component: ActualizarProveedorComponent },
  { path: 'eliminar-proveedor', component: EliminarProveedorComponent },
  { path: 'visualizar-proveedor/:id', component: VisualizarProveedorComponent },
  { path: 'actualizar-proveedor/:id', component: ActualizarProveedorComponent },
  { path: 'eliminar-proveedor/:id', component: EliminarProveedorComponent },

  ///////////////////////////////////////////////////////////////////

  { path: 'roles', component: RolComponent },
  { path: 'agregar-rol', component: AgregarRolComponent },
  { path: 'visualizar-rol', component: VisualizarRolComponent },
  { path: 'actualizar-rol', component: ActualizarRolComponent },
  { path: 'eliminar-rol', component: EliminarRolComponent },
  { path: 'visualizar-rol/:id', component: VisualizarRolComponent },
  { path: 'actualizar-rol/:id', component: ActualizarRolComponent },
  { path: 'eliminar-rol/:id', component: EliminarRolComponent },
  //////////////////////////////////////////////////////////////////

  { path: 'ingredient', component: IngredientesComponent },
  { path: 'add-ingredient', component: AddIngredientComponent },
  { path: 'view-ingredient/:id', component: ReadIngredientComponent },
  { path: 'update-ingredient/:id', component: UpdateIngredientComponent },
  { path: 'delete-ingredient/:id', component: DeleteIngredientComponent },
  //////////////////////////////////////////////////////////////////////
{path:'incoming-stock', component: IncomingStockComponent},
{path:'view-stock/:id',component:ReadIncomingStockComponent},
{path:'add-stock',component:AddIncomingStockComponent},


 ////////////////////////////////////////////////////////////////////////
  { path: 'login', component: LoginComponent },
  {path:'sidebar',component:SidebarComponent},
  { path: 'dashboard', component: MenuComponent },
  { path: 'recuperar-pwd', component: RecuperarPwdComponent },
  { path: 'logout', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },

];

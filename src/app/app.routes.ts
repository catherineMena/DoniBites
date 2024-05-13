import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProductosComponent } from './productos/productos.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { AgregarCategoriaComponent } from './Add/agregar-categoria/agregar-categoria.component';
import { VisualizarCategoriaComponent } from './read/visualizar-categoria/visualizar-categoria.component';
import { ActualizarCategoriaComponent } from './update/actualizar-categoria/actualizar-categoria.component';
import { EliminarCategoriaComponent } from './delete/eliminar-categoria/eliminar-categoria.component';
import { AgregarUsuarioComponent } from './Add/agregar-usuario/agregar-usuario.component';
import { VisualizarUsuarioComponent } from './read/visualizar-usuario/visualizar-usuario.component';
import { ActualizarUsuarioComponent } from './update/actualizar-usuario/actualizar-usuario.component';
import { EliminarUsuarioComponent } from './delete/eliminar-usuario/eliminar-usuario.component';




 export const appRoutes: Routes = [
  { path: 'usuario', component: UsuarioComponent },
  { path: 'productos', component: ProductosComponent },

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
  { path: 'eliminar-usuario', component: EliminarUsuarioComponent}


  // Agrega aquí más rutas según sea necesario
];

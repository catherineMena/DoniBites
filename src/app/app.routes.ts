import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProductosComponent } from './productos/productos.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { AgregarCategoriaComponent } from './Add/agregar-categoria/agregar-categoria.component';
import { VisualizarCategoriaComponent } from './read/visualizar-categoria/visualizar-categoria.component';
import { ActualizarCategoriaComponent } from './update/actualizar-categoria/actualizar-categoria.component';
import { EliminarCategoriaComponent } from './delete/eliminar-categoria/eliminar-categoria.component';


 export const appRoutes: Routes = [
  { path: 'usuario', component: UsuarioComponent },
  { path: 'productos', component: ProductosComponent },

  /////////////////////////////////////////////////////////////////////
  { path: 'categoria', component: CategoriaComponent },
  { path: 'agregar-categoria', component: AgregarCategoriaComponent },
  { path: 'visualizar-categoria', component: VisualizarCategoriaComponent },
  { path: 'actualizar-categoria', component: ActualizarCategoriaComponent},
  {path:'eliminar-categoria', component: EliminarCategoriaComponent},
  // Agrega aquí más rutas según sea necesario
];

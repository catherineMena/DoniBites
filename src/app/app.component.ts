import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoriaComponent } from "./categoria/categoria.component";
import { ProductoComponent } from "./producto/producto.component";
import { UsuarioComponent } from "./usuario/usuario.component";
import { MenuComponent } from './menu/menu.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'DoniBites';
}

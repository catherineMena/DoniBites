import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolService } from '../../services/rol.service';

@Component({
  selector: 'app-actualizar-rol',
  templateUrl: './actualizar-rol.component.html',
  styleUrls: ['./actualizar-rol.component.css']
})
export class ActualizarRolComponent implements OnInit {
  id: number = 0;
  nombre: string = '';  // Campo para el nombre del rol
  descripcion: string = '';  // Campo para la descripción del rol

  constructor(private rolService: RolService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.rolService.getRoleById(this.id).subscribe(
        (res: any) => {
          this.nombre = res.name;  // Cambiado para reflejar el nombre del rol
          this.descripcion = res.description; // Mantenido para reflejar la descripción del rol
        },
        err => console.error(err)
      );
    });
  }

  actualizarRol(): void {
    if (this.nombre.trim() === '' || this.descripcion.trim() === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const rolActualizado = {
      id: this.id,
      name: this.nombre,  // Cambiado para reflejar el nombre del rol
      description: this.descripcion // Mantenido para reflejar la descripción del rol
    };

    this.rolService.updateRole(this.id, rolActualizado).subscribe(
      (response: any) => {
        console.log('Rol actualizado con éxito:', response);
        this.router.navigate(['/roles']); // Cambiado a la ruta correspondiente
      },
      (error: any) => {
        console.error('Error al actualizar el rol:', error);
        alert('Error al actualizar el rol. Por favor, inténtalo de nuevo.');
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolService } from '../../services/rol.service'; // Asegúrate de tener este servicio creado

@Component({
  selector: 'app-eliminar-rol',
  templateUrl: './eliminar-rol.component.html',
  styleUrls: ['./eliminar-rol.component.css']
})
export class EliminarRolComponent implements OnInit {
  id: number = 0;
  rol: string = ''; // Almacena el nombre del rol

  constructor(private rolService: RolService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // Obtén el ID del rol de la ruta
      this.rolService.getRoleById(this.id).subscribe(
        (res: any) => {
          this.rol = res.name; // Asegúrate de que `name` es el campo correcto
        },
        err => console.error(err)
      );
    });
  }

  eliminarRol(): void {
    if (!confirm('¿Estás seguro de que quieres eliminar este rol?')) {
      return; // Si el usuario cancela, no hacemos nada
    }

    this.rolService.deleteRole(this.id).subscribe(
      () => {
        console.log('Rol eliminado con éxito');
        this.router.navigate(['/roles']); // Redirigir a la lista de roles después de eliminar
      },
      (error) => {
        console.error('Error al eliminar el rol:', error);
        alert('Error al eliminar el rol. Por favor, inténtalo de nuevo.');
      }
    );
  }

}

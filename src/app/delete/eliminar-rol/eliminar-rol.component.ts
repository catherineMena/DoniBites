import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { RolService } from '../../services/rol.service';

@Component({
  selector: 'app-eliminar-rol',
  templateUrl: './eliminar-rol.component.html',
  styleUrls: ['./eliminar-rol.component.css']
})
export class EliminarRolComponent implements OnInit {
  id: number = 0;
  rol: any = {};

  constructor(private rolService: RolService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.rolService.getRoleById(this.id).subscribe(
        (res: any) => {
          this.rol = res;
        },
        err => console.error(err)
      );
    });
  }

  deleteRole(): void {
    this.rolService.deleteRole(this.id).subscribe(
      () => {
        console.log('Rol eliminado con éxito');
        Toastify({
          text: "Rol eliminado con éxito",
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          backgroundColor: "#36CB7C",
        }).showToast();
        this.router.navigate(['/rol']); // Redirige a la lista de roles u otra página según tu flujo
      },
      (error: any) => {
        console.error('Error al eliminar el rol:', error);
        Toastify({
          text: "Error al eliminar el rol. Por favor, inténtalo de nuevo.",
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          backgroundColor: "#ff5f6d",
        }).showToast();
      }
    );
  }
}

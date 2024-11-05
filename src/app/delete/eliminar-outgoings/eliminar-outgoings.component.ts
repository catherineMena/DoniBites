import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { OutgoingService } from '../../services/outgoings.service'; // Asegúrate de que el servicio existe

@Component({
  selector: 'app-eliminar-outgoings',
  templateUrl: './eliminar-outgoings.component.html',
  styleUrls: ['./eliminar-outgoings.component.css']
})
export class EliminarOutgoingsComponent implements OnInit {
  id: number = 0;
  outgoing: any = {};

  constructor(private outgoingService: OutgoingService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.outgoingService.getOutgoingById(this.id).subscribe(
        (res: any) => {
          this.outgoing = res;
        },
        err => console.error(err)
      );
    });
  }

  eliminarOutgoing(): void {
    this.outgoingService.deleteOutgoing(this.id).subscribe(
      () => {
        console.log('Salida eliminada con éxito');
        Toastify({
          text: "Salida eliminada con éxito",
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          backgroundColor: "#36CB7C",
        }).showToast();
        this.router.navigate(['/outgoings']); // Redirige a la lista de salidas u otra página según tu flujo
      },
      (error: any) => {
        console.error('Error al eliminar la salida:', error);
        Toastify({
          text: "Error al eliminar la salida. Por favor, inténtalo de nuevo.",
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          backgroundColor: "#ff5f6d",
        }).showToast();
      }
    );
  }
}

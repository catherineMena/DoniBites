import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OutgoingService } from '../../services/outgoings.service';

@Component({
  selector: 'app-visualizar-outgoings',
  templateUrl: './visualizar-outgoings.component.html',
  styleUrls: ['./visualizar-outgoings.component.css']
})
export class VisualizarOutgoingsComponent implements OnInit {
  outgoing: any; // Aquí se almacenará la información de "outgoings"

  constructor(private outgoingService: OutgoingService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const outgoingId = +params['id']; // Obtener el ID de la salida desde la URL
      this.obtenerOutgoingsPorId(outgoingId); // Llamar al método para obtener la salida
    });
  }

  obtenerOutgoingsPorId(id: number): void {
    this.outgoingService.getOutgoingById(id).subscribe(
      res => {
        this.outgoing = res; // Asignar la respuesta a la variable "outgoing"
      },
      err => {
        console.error('Error al obtener outgoing:', err); // Manejar errores
        alert('No se pudo obtener la salida.'); // Mensaje de error
      }
    );
  }
}

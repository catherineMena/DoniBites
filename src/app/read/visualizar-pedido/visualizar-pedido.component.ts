import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-visualizar-pedido',
  templateUrl: './visualizar-pedido.component.html',
  styleUrls: ['./visualizar-pedido.component.css']
})
export class VisualizarPedidoComponent implements OnInit {
  pedido: any;

  constructor(private pedidoService: PedidoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const pedidoId = +params['id'];
      this.obtenerPedidoPorId(pedidoId);
    });
  }

  obtenerPedidoPorId(id: number): void {
    this.pedidoService.getPedidoById(id).subscribe(
      res => {
        this.pedido = res;
      },
      err => {
        console.error('Error al obtener pedido:', err);
        alert('No se pudo obtener el pedido.'); // Muestra un mensaje al usuario
      }
    );
  }
}

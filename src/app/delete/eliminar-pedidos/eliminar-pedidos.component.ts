import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../../services/pedido.service'; // Asegúrate de que el servicio existe

@Component({
  selector: 'app-eliminar-pedidos',
  templateUrl: './eliminar-pedidos.component.html',
  styleUrls: ['./eliminar-pedidos.component.css']
})
export class EliminarPedidoComponent implements OnInit {
  id: number = 0;
  pedido: any = {};

  constructor(private pedidoService: PedidoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.pedidoService.getPedidoById(this.id).subscribe(
        (res: any) => {
          this.pedido = res;
        },
        err => console.error(err)
      );
    });
  }

  eliminarPedido(): void {
    this.pedidoService.deletePedido(this.id).subscribe(
      () => {
        console.log('Pedido eliminado con éxito');
        this.router.navigate(['/pedidos']); // Redirige a la lista de pedidos u otra página según tu flujo
      },
      (error: any) => {
        console.error('Error al eliminar el pedido:', error);
        alert('Error al eliminar el pedido. Por favor, inténtalo de nuevo.');
      }
    );
  }
}

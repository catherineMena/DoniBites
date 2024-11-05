import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
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
        Toastify({
          text: "Pedido eliminado con éxito",
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          backgroundColor: "#36CB7C",
        }).showToast();
        this.router.navigate(['/pedido']); // Redirige a la lista de pedidos u otra página según tu flujo
      },
      (error: any) => {
        console.error('Error al eliminar el pedido:', error);
        Toastify({
          text: "Error al eliminar el pedido. Por favor, inténtalo de nuevo.",
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          backgroundColor: "#ff5f6d",
        }).showToast();
      }
    );
  }
}

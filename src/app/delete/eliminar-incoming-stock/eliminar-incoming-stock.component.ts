import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { InventoryService } from '../../services/inventory.service'; // Asegúrate de que el servicio existe

@Component({
  selector: 'app-eliminar-incoming-stock',
  templateUrl: './eliminar-incoming-stock.component.html',
  styleUrls: ['./eliminar-incoming-stock.component.css']
})
export class EliminarIncomingStockComponent implements OnInit {
  id: number = 0;
  incomingStock: any = {}; // Cambiado para reflejar la entrada de stock

  constructor(
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.inventoryService.getStockEntryById(this.id).subscribe(
        (res: any) => {
          this.incomingStock = res;
        },
        err => console.error(err)
      );
    });
  }

  eliminarIncomingStock(): void {
      this.inventoryService.deleteEntry(this.id).subscribe(
        () => {
          console.log('Entrada de inventario eliminada con éxito');
          Toastify({
            text: "Entrada de inventario eliminada con éxito",
            duration: 3000,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            backgroundColor: "#36CB7C",
          }).showToast();
          this.router.navigate(['/incoming-stock']); // Redirige a la lista de entradas o a otra página según tu flujo
        },
        (error: any) => {
          console.error('Error al eliminar la entrada de inventario:', error);
          Toastify({
            text: "Error al eliminar la entrada de inventario. Por favor, inténtalo de nuevo.",
            duration: 3000,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            backgroundColor: "#ff5f6d",
          }).showToast();
        }
      );
    }
}


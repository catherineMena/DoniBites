import { Component } from '@angular/core';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { InventoryService } from '../../services/inventory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-incoming-stock',
  templateUrl: './add-incoming-stock.component.html',
  styleUrls: ['./add-incoming-stock.component.css']
})
export class AddIncomingStockComponent {
  ingredient: string = '';
  quantity: number = 0;
  provider: string = '';
  date: string = ''; // Cambiamos a string para manejar el valor del input de tipo date
  amountPaid: number = 0;
  user: string = '';

  constructor(private inventoryService: InventoryService, private router: Router) { }

  saveStock(): void {
    // Convertimos la fecha a un objeto Date
    const entryDate = new Date(this.date);

    // Verificación de campos
    if (!this.date || isNaN(entryDate.getTime())) {
      this.showToast("Por favor, ingresa una fecha válida.");
      return;
    }
    if (this.ingredient.trim() === '') {
      this.showToast("Por favor, ingresa un ingrediente.");
      return;
    }
    if (this.quantity <= 0) {
      this.showToast("Por favor, ingresa una cantidad válida.");
      return;
    }
    if (this.provider.trim() === '') {
      this.showToast("Por favor, ingresa un proveedor.");
      return;
    }
    if (this.amountPaid <= 0) {
      this.showToast("Por favor, ingresa un monto pagado válido.");
      return;
    }
    if (this.user.trim() === '') {
      this.showToast("Por favor, ingresa un usuario.");
      return;
    }

    const newEntry = {
      entryDate: entryDate.toISOString(), // Convertimos la fecha a ISO string
      ingredient: {
        name: this.ingredient
      },
      qty: this.quantity,
      provider: {
        name: this.provider
      },
      paidAmount: this.amountPaid,
      recordUser: this.user
    };

    console.log('Datos de la entrada a guardar:', newEntry);

    this.inventoryService.createEntry(newEntry).subscribe(
      (response: any) => {
        console.log('La entrada se ha guardado con éxito:', response);
        Toastify({
          text: "La entrada se ha guardado con éxito",
          duration: 3000,
          gravity: "top",
          position: "center",
          backgroundColor: "#36CB7C",
        }).showToast();
        this.router.navigate(['/incoming-stock']);
      },
      (error: any) => {
        console.error('Error al guardar entrada:', error);
        Toastify({
          text: "Error al guardar entrada. Inténtalo de nuevo.",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#ff5f6d",
        }).showToast();
      }
    );
  }

  private showToast(message: string): void {
    Toastify({
      text: message,
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "rgba(145, 142, 244)",
    }).showToast();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { IngredientService } from '../../services/ingredient.service';
import { InventoryService } from '../../services/inventory.service';
import { ProveedoresService } from '../../services/proveedores.service';

interface Ingredient {
  id: number;
  name: string;
  unit: string;
  status: string;
}

interface Provider {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  status: string;
}

interface IncomingStock {
  id: number;
  entryDate: string; // Cambiado de arrivalDate a entryDate
  ingredient: Ingredient;
  expirationDate: string;
  qty: number;
  paidAmount: number; // Asegúrate de que esta propiedad existe en tu modelo
  recordUser: number;
  provider: Provider;
}

@Component({
  selector: 'app-actualizar-incoming-stock',
  templateUrl: './actualizar-incoming-stock.component.html',
  styleUrls: ['./actualizar-incoming-stock.component.css']
})
export class ActualizarIncomingStockComponent implements OnInit {
  incomingStock: IncomingStock = {
    id: 0,
    entryDate: '', // Cambiado de arrivalDate a entryDate
    ingredient: { id: 0, name: '', unit: '', status: '' },
    expirationDate: '',
    qty: 0,
    paidAmount: 0, // Asegúrate de que esta propiedad existe en tu modelo
    recordUser: 0,
    provider: { id: 0, name: '', address: '', phone: '', email: '', status: '' }
  };

  ingredientes: Ingredient[] = [];
  proveedores: Provider[] = [];
  selectedIngredient!: Ingredient;
  selectedProvider!: Provider;

  constructor(
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private ingredientService: IngredientService,
    private proveedoresService: ProveedoresService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const incomingStockId = +params['id'];
      this.obtenerIncomingStockPorId(incomingStockId);
    });
    this.cargarIngredientes();
    this.cargarProveedores();
  }

  obtenerIncomingStockPorId(id: number): void {
    this.inventoryService.getStockEntryById(id).subscribe(
      res => {
        this.incomingStock = res;
        this.incomingStock.entryDate = this.formatearFecha(this.incomingStock.entryDate); // Usar entryDate
        this.incomingStock.expirationDate = this.formatearFecha(this.incomingStock.expirationDate);
        this.selectedIngredient = this.incomingStock.ingredient;
        this.selectedProvider = this.incomingStock.provider;
      },
      err => {
        console.error('Error al obtener la entrada:', err);
        alert('No se pudo obtener la entrada.');
      }
    );
  }

  formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toISOString().split('T')[0];
  }

  cargarIngredientes(): void {
    this.ingredientService.getAllIngredients().subscribe(
      res => this.ingredientes = res,
      err => console.error('Error al cargar ingredientes:', err)
    );
  }

  cargarProveedores(): void {
    this.proveedoresService.getAllProviders().subscribe(
      res => this.proveedores = res,
      err => console.error('Error al cargar proveedores:', err)
    );
  }

  onIngredientChange(event: any): void {
    const selectedId = +event.target.value;
    this.selectedIngredient = this.ingredientes.find(ing => ing.id === selectedId) || { id: 0, name: '', unit: '', status: '' };
    this.incomingStock.ingredient = { ...this.selectedIngredient };
  }

  onProviderChange(event: any): void {
    const selectedId = +event.target.value;
    this.selectedProvider = this.proveedores.find(prov => prov.id === selectedId) || { id: 0, name: '', address: '', phone: '', email: '', status: '' };
    this.incomingStock.provider = { ...this.selectedProvider };
  }

  actualizarIncomingStock(): void {
    if (this.incomingStock.entryDate && this.incomingStock.expirationDate && this.incomingStock.qty > 0 && this.incomingStock.paidAmount >= 0) {
      this.inventoryService.updateEntry(this.incomingStock.id, this.incomingStock).subscribe(
        res => {
          console.log('Incoming stock actualizado con éxito:', res);
          Toastify({
            text: "Entrada de stock actualizada con éxito",
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "#36CB7C",
          }).showToast();
          this.router.navigate(['/incoming-stock']);
        },
        err => {
          console.error('Error al actualizar el incoming stock:', err);
          Toastify({
            text: "Error al actualizar la entrada de stock. Por favor, inténtalo de nuevo.",
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "#ff5f6d",
          }).showToast();
        }
      );
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }
}

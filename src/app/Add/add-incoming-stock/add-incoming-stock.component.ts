import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { IngredientService } from '../../services/ingredient.service';
import { InventoryService } from '../../services/inventory.service';
import { ProveedoresService } from '../../services/proveedores.service';

@Component({
  selector: 'app-add-incoming-stock',
  templateUrl: './add-incoming-stock.component.html',
  styleUrls: ['./add-incoming-stock.component.css']
})
export class AddIncomingStockComponent implements OnInit {
  id: number = 0; // ID de la entrada de stock
  ingredientId: number = 0; // ID del ingrediente
  ingredientName: string = ''; // Nombre del ingrediente
  ingredientUnit: string = ''; // Unidad del ingrediente
  entryDate: string = new Date().toISOString().split('T')[0]; // Fecha de entrada por defecto
  expirationDate: string = new Date().toISOString().split('T')[0]; // Fecha de expiración por defecto
  qty: number = 1; // Cantidad por defecto
  providerId: number = 0; // ID del proveedor
  providerName: string = ''; // Nombre del proveedor
  providerAddress: string = ''; // Dirección del proveedor
  providerPhone: string = ''; // Teléfono del proveedor
  providerEmail: string = ''; // Email del proveedor
  paidAmount: number = 0; // Monto pagado por defecto
  recordUser: number = 1; // Usuario que registra por defecto
  ingredients: any[] = []; // Lista de ingredientes disponibles
  providers: any[] = []; // Lista de proveedores disponibles

  constructor(
    private inventoryService: InventoryService,
    private ingredientService: IngredientService,
    private proveedoresService: ProveedoresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarIngredientes(); // Cargar ingredientes al inicializar
    this.cargarProveedores(); // Cargar proveedores al inicializar

  }

  cargarIngredientes(): void {
    this.ingredientService.getAllIngredients().subscribe(
      (data: any) => {
        this.ingredients = data; // Asignar los ingredientes al array
      },
      (error: any) => {
        console.error('Error al cargar los ingredientes:', error);
      }
    );
  }


  cargarProveedores(): void {
    this.proveedoresService.getAllProviders().subscribe(
      (data: any) => {
        this.providers = data; // Asignar los proveedores al array
      },
      (error: any) => {
        console.error('Error al cargar los proveedores:', error);
      }
    );
  }

  saveIncomingStock(): void {
    // Validar que todos los campos requeridos estén completos
    if (
      this.ingredientId <= 0 ||
      this.qty <= 0 ||
      this.entryDate.trim() === '' ||
      this.expirationDate.trim() === '' ||
      this.ingredientUnit.trim() === '' ||
      this.providerId <= 0 ||
      this.paidAmount < 0
    ) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    // Crear el objeto de entrada de stock
    const newStockEntry = {
      id: this.id,
      entryDate: this.entryDate + 'T00:00:00.000Z',
      ingredient: {
        id: this.ingredientId,
        name: this.ingredientName,
        unit: this.ingredientUnit,
        status: "activo"
      },
      expirationDate: this.expirationDate + 'T00:00:00.000Z',
      provider: {
        id: this.providerId,
        name: this.providerName,
        address: this.providerAddress,
        phone: this.providerPhone,
        email: this.providerEmail,
        status: "activo"
      },
      qty: this.qty,
      paidAmount: this.paidAmount,
      recordUser: this.recordUser
    };

    // Llamada al servicio para guardar la entrada de stock
    this.inventoryService.createEntry(newStockEntry).subscribe(
      (response: any) => {
        console.log('Entrada de stock guardada con éxito:', response);
        Toastify({
          text: "La entrada de stock se ha guardado con éxito",
          duration: 3000,
          gravity: "top",
          position: "center",
          backgroundColor: "#36CB7C",
        }).showToast();
        this.router.navigate(['/incoming-stock']); // Redirigir a la lista de entradas de inventario
      },
      (error: any) => {
        console.error('Error al guardar la entrada de stock:', error);
        Toastify({
          text: "Error al guardar la entrada de stock. Inténtalo de nuevo.",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#ff5f6d",
        }).showToast();
      }
    );
  }

  onIngredientChange(event: any): void {
    this.ingredientId = +event.target.value;
    const selectedIngredient = this.ingredients.find(ingredient => ingredient.id === this.ingredientId);
    if (selectedIngredient) {
      this.ingredientName = selectedIngredient.name;
      this.ingredientUnit = selectedIngredient.unit;
    } else {
      this.ingredientName = '';
      this.ingredientUnit = '';
    }
  }

  onProviderChange(event: any): void {
    this.providerId = +event.target.value;
    const selectedProvider = this.providers.find(provider => provider.id === this.providerId);
    if (selectedProvider) {
      this.providerName = selectedProvider.name;
      this.providerAddress = selectedProvider.address;
      this.providerPhone = selectedProvider.phone;
      this.providerEmail = selectedProvider.email;
    } else {
      this.providerName = '';
      this.providerAddress = '';
      this.providerPhone = '';
      this.providerEmail = '';
    }
  }
}

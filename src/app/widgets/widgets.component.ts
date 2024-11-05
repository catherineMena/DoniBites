import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IngredientService } from '../services/ingredient.service';
import { InventoryService } from '../services/inventory.service';
import { OutgoingService } from '../services/outgoings.service';
import { ProductoService } from '../services/producto.service';
import { ProveedoresService } from '../services/proveedores.service';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent implements OnInit {
  totalProductos: number = 0;
  totalIngredientes: number = 0;
  totalProveedores: number = 0;
  totalEntradas: number = 0;
  totalSalidas: number = 0;
  errorMessage: string = '';

  constructor(
    private productoService: ProductoService,
    private ingredientService: IngredientService,
    private proveedorService: ProveedoresService,
    private inventoryService: InventoryService,
    private OutgoingService: OutgoingService
  ) {}

  ngOnInit(): void {
    this.productoService.getAllProductos().pipe(
      catchError(error => {
        this.errorMessage = 'Error al obtener los productos';
        console.error('Error al obtener los productos:', error);
        return of([]);
      })
    ).subscribe(productos => {
      this.totalProductos = productos.length;
    });

    this.ingredientService.getAllIngredients().pipe(
      catchError(error => {
        this.errorMessage = 'Error al obtener los ingredientes';
        console.error('Error al obtener los ingredientes:', error);
        return of([]);
      })
    ).subscribe(ingredient => {
      this.totalIngredientes = ingredient.length;
    });

    this.proveedorService.getAllProviders().pipe(
      catchError(error => {
        this.errorMessage = 'Error al obtener los proveedores';
        console.error('Error al obtener los proveedores:', error);
        return of([]);
      })
    ).subscribe(proveedores => {
      this.totalProveedores = proveedores.length;
    });

    this.inventoryService.getIncomingStocks().pipe(
      catchError(error => {
        this.errorMessage = 'Error al obtener las entradas de inventario';
        console.error('Error al obtener las entradas de inventario:', error);
        return of([]);
      })
    ).subscribe(entradas => {
      this.totalEntradas = entradas.length;
    });

    this.OutgoingService.getAllOutgoings().pipe(
      catchError(error => {
        this.errorMessage = 'Error al obtener las salidas de inventario';
        console.error('Error al obtener las salidas de inventario:', error);
        return of([]);
      })
    ).subscribe(salidas => {
      this.totalSalidas = salidas.length;
    });
  }
}

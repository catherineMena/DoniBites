import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-incoming-stock',
  templateUrl: './incoming-stock.component.html',
  styleUrl: './incoming-stock.component.css'
})
export class IncomingStockComponent implements OnInit {
  incomingStocks: any[] = [];
  filteredStocks: any[] = [];

  constructor(private router: Router, private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadIncomingStocks();
  }

viewIngredient(id: number): void {
    this.router.navigate(['/view-ingredient', id]);
  }

  editIngredient(id: number): void {
    this.router.navigate(['/update-ingredient', id]);
  }

deleteIngredient(id: number): void {
    this.router.navigate(['/delete-ingredient', id]);
  }



  loadIncomingStocks(): void {
    this.inventoryService.getIncomingStocks().subscribe({
      next: (data: any[]) => {
        this.incomingStocks = data;
        this.filteredStocks = data;
      },
      error: (err) => {
        console.error('Error al cargar las entradas de inventario:', err);
      }
    });
  }

  searchStock(event: any): void {
    const value = event.target.value.toLowerCase();
    this.filteredStocks = this.incomingStocks.filter(stock =>
      stock.ingredient.name.toLowerCase().includes(value) ||
      stock.provider.name.toLowerCase().includes(value)
    );
  }

  downloadList(format: string): void {
    if (format === 'pdf') {
      this.downloadPDF();
    } else if (format === 'excel') {
      this.downloadExcel();
    }
  }

  // Método para descargar en PDF
  downloadPDF(): void {
    const doc = new jsPDF();
    doc.text('Tabla de Entradas de Inventario', 10, 10);
    (doc as any).autoTable({
      head: [['ID', 'Fecha de Entrada', 'Ingrediente', 'Fecha de Expiración', 'Proveedor', 'Cantidad', 'Monto Pagado', 'Usuario de Registro']],
      body: this.filteredStocks.map(stock => [
        stock.id,
        new Date(stock.entryDate).toLocaleDateString(),
        `${stock.ingredient.name} (${stock.ingredient.unit})`,
        new Date(stock.expirationDate).toLocaleDateString(),
        stock.provider.name,
        stock.qty,
        stock.paidAmount,
        stock.recordUser
      ])
    });
    doc.save('Inventario.pdf');
  }

  // Método para descargar en Excel
  downloadExcel(): void {
    const headers = [['ID', 'Fecha de Entrada', 'Ingrediente', 'Fecha de Expiración', 'Proveedor', 'Cantidad', 'Monto Pagado', 'Usuario de Registro']];
    const data = this.filteredStocks.map(stock => [
      stock.id,
      new Date(stock.entryDate).toLocaleDateString(),
      `${stock.ingredient.name} (${stock.ingredient.unit})`,
      new Date(stock.expirationDate).toLocaleDateString(),
      stock.provider.name,
      stock.qty,
      stock.paidAmount,
      stock.recordUser
    ]);
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([...headers, ...data]);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, 'Inventario.xlsx');
  }
}

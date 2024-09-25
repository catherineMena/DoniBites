import { Component } from '@angular/core';
import { Router } from '@angular/router';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent implements OnInit {
stocks: any[] = [];
  filterStock: any[] = [];

  constructor(private router: Router, private stockService: stockService) { }

  ngOnInit() {
    this.loadStock();
  }

  loadStock(): void {
    this.stockService.getAllStock().subscribe(
      (data: any) => {
        this.stocks = data;
        this.filterStock = data;
      },
      err => {
        console.error('Error al cargar los ingredientes:', err);
        this.stocks = [];
        this.filterStock = [];
      }
    );
  }

  searchStock(event: any): void {
    const valor = event.target.value.toLowerCase();
    this.filterStock = this.stocks.filter(stocks =>
      stocks.name.toLowerCase().includes(valor) ||
      stocks.unit.toLowerCase().includes(valor)
    );
  }



  downloadList(): void {
    const doc = new jsPDF();
    const tableColumn = ["Id", "Nombre", "Unidad de medida"];
    const tableRows: any[] = [];

    this.filterStock.forEach(stock => {
      const stockData = [
        stock.id,
        stock.ingredient,
        stock.unit
      ];
      tableRows.push(stockData);
    });

    (doc as any).autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Lista de inventario", 14, 15);
    doc.save('Inventario.pdf');
  }

  viewStock(id: number): void {
    this.router.navigate(['/view-stock', id]);
  }

  editStock(id: number): void {
    this.router.navigate(['/update-stock', id]);
  }

deleteStock(id: number): void {
    this.router.navigate(['/delete-stock', id]);
  }
}



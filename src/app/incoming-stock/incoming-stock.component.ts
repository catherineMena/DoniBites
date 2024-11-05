import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { InventoryService } from '../services/inventory.service';

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
    const currentDate = new Date().toLocaleDateString();

    // Calcula el monto total pagado para cada entrada de inventario y el subtotal general
    const stocksWithTotals = this.filteredStocks.map(stock => {
        return {
            ...stock,
            paidAmountFormatted: `$ ${(parseFloat(stock.paidAmount)).toFixed(2)}`
        };
    });

    const subtotal = stocksWithTotals.reduce((acc, stock) => acc + parseFloat(stock.paidAmount), 0).toFixed(2);
    const iva = (parseFloat(subtotal) * 0.15).toFixed(2);
    const total = (parseFloat(subtotal) + parseFloat(iva)).toFixed(2);

    // Configurar el encabezado y la tabla de entradas de inventario
    (doc as any).autoTable({
        body: [
            // Título del reporte
            [
                { content: 'Tabla de Entradas de Inventario', colSpan: 8, styles: { halign: 'center', fillColor: [22, 160, 133], textColor: 255, fontSize: 14, fontStyle: 'bold' } }
            ],
            // Nombre del negocio
            [
                { content: 'Nombre del negocio: Donibites', colSpan: 8, styles: { fontStyle: 'bold', halign: 'left' } }
            ],
            [
                { content: 'Dirección: Avenida Juan Pablo Segundo, Managua, Nicaragua', colSpan: 8, styles: { fontStyle: 'bold', halign: 'left' } }
            ],
            // Fecha de generación
            [
                { content: 'Fecha de generación: ' + currentDate, colSpan: 8, styles: { fontStyle: 'bold', halign: 'left' } }
            ],
            // Encabezado de la tabla de inventario
            [
                { content: 'ID', styles: { halign: 'center', fillColor: [22, 160, 133], textColor: 255 } },
                { content: 'Fecha de Entrada', styles: { fillColor: [22, 160, 133], textColor: 255 } },
                { content: 'Ingrediente', styles: { fillColor: [22, 160, 133], textColor: 255 } },
                { content: 'Fecha de Expiración', styles: { fillColor: [22, 160, 133], textColor: 255 } },
                { content: 'Proveedor', styles: { fillColor: [22, 160, 133], textColor: 255 } },
                { content: 'Cantidad', styles: { halign: 'center', fillColor: [22, 160, 133], textColor: 255 } },
                { content: 'Usuario de Registro', styles: { fillColor: [22, 160, 133], textColor: 255 } },
                { content: 'Monto Pagado ($)', styles: { halign: 'center', fillColor: [22, 160, 133], textColor: 255 } }
            ],
            // Datos de las entradas de inventario
            ...stocksWithTotals.map(stock => [
                { content: stock.id.toString(), styles: { halign: 'center' } },
                { content: new Date(stock.entryDate).toLocaleDateString() },
                { content: `${stock.ingredient.name} (${stock.ingredient.unit})` },
                { content: new Date(stock.expirationDate).toLocaleDateString() },
                { content: stock.provider.name },
                { content: stock.qty.toString(), styles: { halign: 'center' } },
                { content: stock.recordUser },
                { content: stock.paidAmountFormatted, styles: { halign: 'center' } }
            ]),
            // Subtotales y totales
            [
                { content: 'Subtotal', colSpan: 7, styles: { halign: 'right', fontStyle: 'bold' } },
                { content: `$ ${subtotal}`, styles: { halign: 'center' } }
            ],
            [
                { content: 'IVA (15%)', colSpan: 7, styles: { halign: 'right', fontStyle: 'bold' } },
                { content: `$ ${iva}`, styles: { halign: 'center' } }
            ],
            [
                { content: 'Total', colSpan: 7, styles: { halign: 'right', fontStyle: 'bold' } },
                { content: `$ ${total}`, styles: { halign: 'center' } }
            ]
        ]
    });

    doc.save('Inventario.pdf');
}


  // Método para descargar en Excel
  downloadExcel(): void {
    // Encabezado del reporte con estilos
    const headerInfo = [
        [{ v: 'Reporte de Entradas de Inventario', s: { font: { bold: true, sz: 14 }, fill: { fgColor: { rgb: "16A085" } }, alignment: { horizontal: 'center', vertical: 'center' }, color: { rgb: "FFFFFF" } } }],
        [{ v: 'Nombre del negocio: Donibites', s: { font: { bold: true, sz: 12 }, alignment: { horizontal: 'left' } } }],
        [{ v: 'Dirección: Avenida Juan Pablo Segundo, Managua, Nicaragua', s: { font: { bold: true, sz: 12 }, alignment: { horizontal: 'left' } } }],
        [{ v: 'Fecha de generación: ' + new Date().toLocaleDateString(), s: { font: { bold: true, sz: 12 }, alignment: { horizontal: 'left' } } }],
        [] // Espacio en blanco para separar el encabezado de la tabla de inventario
    ];

    // Encabezados de la tabla de inventario con estilos
    const headers = [
        [{ v: 'ID', s: { font: { bold: true }, fill: { fgColor: { rgb: "1ABC9C" } }, alignment: { horizontal: 'center' }, color: { rgb: "FFFFFF" } } },
         { v: 'Fecha de Entrada', s: { font: { bold: true }, fill: { fgColor: { rgb: "1ABC9C" } }, alignment: { horizontal: 'center' }, color: { rgb: "FFFFFF" } } },
         { v: 'Ingrediente', s: { font: { bold: true }, fill: { fgColor: { rgb: "1ABC9C" } }, alignment: { horizontal: 'center' }, color: { rgb: "FFFFFF" } } },
         { v: 'Fecha de Expiración', s: { font: { bold: true }, fill: { fgColor: { rgb: "1ABC9C" } }, alignment: { horizontal: 'center' }, color: { rgb: "FFFFFF" } } },
         { v: 'Proveedor', s: { font: { bold: true }, fill: { fgColor: { rgb: "1ABC9C" } }, alignment: { horizontal: 'center' }, color: { rgb: "FFFFFF" } } },
         { v: 'Cantidad', s: { font: { bold: true }, fill: { fgColor: { rgb: "1ABC9C" } }, alignment: { horizontal: 'center' }, color: { rgb: "FFFFFF" } } },
         { v: 'Usuario de Registro', s: { font: { bold: true }, fill: { fgColor: { rgb: "1ABC9C" } }, alignment: { horizontal: 'center' }, color: { rgb: "FFFFFF" } } },
         { v: 'Monto Pagado ($)', s: { font: { bold: true }, fill: { fgColor: { rgb: "1ABC9C" } }, alignment: { horizontal: 'center' }, color: { rgb: "FFFFFF" } } }]
    ];

    // Datos de la tabla de inventario con "Monto Pagado" como número
    const data = this.filteredStocks.map(stock => [
        stock.id,
        new Date(stock.entryDate).toLocaleDateString(),
        `${stock.ingredient.name} (${stock.ingredient.unit})`,
        new Date(stock.expirationDate).toLocaleDateString(),
        stock.provider.name,
        stock.qty,
        stock.recordUser,
        parseFloat(stock.paidAmount).toFixed(2) // Sin símbolo de moneda para cálculos
    ]);

    // Cálculo del subtotal, IVA, y total
    const subtotal = data.reduce((acc, stock) => acc + parseFloat(stock[7]), 0).toFixed(2);
    const iva = (parseFloat(subtotal) * 0.15).toFixed(2);
    const total = (parseFloat(subtotal) + parseFloat(iva)).toFixed(2);

    // Resumen final de Subtotal, IVA, y Total con el símbolo de dólar
    const summary = [
        [], // Línea en blanco
        [{}, {}, {}, {}, {}, {}, { v: 'Subtotal:', s: { font: { bold: true }, alignment: { horizontal: 'right' } } }, { v: `$ ${subtotal}`, s: { font: { bold: true }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: "D5DBDB" } } } }],
        [{}, {}, {}, {}, {}, {}, { v: 'IVA (15%):', s: { font: { bold: true }, alignment: { horizontal: 'right' } } }, { v: `$ ${iva}`, s: { font: { bold: true }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: "D5DBDB" } } } }],
        [{}, {}, {}, {}, {}, {}, { v: 'Total:', s: { font: { bold: true }, alignment: { horizontal: 'right' } } }, { v: `$ ${total}`, s: { font: { bold: true }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: "D5DBDB" } } } }]
    ];

    // Crear la hoja de cálculo y agregar el encabezado, los datos y el resumen
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([...headerInfo, ...headers, ...data, ...summary]);

    // Ajuste de ancho de columnas
    worksheet['!cols'] = [
        { wch: 5 },   // ID
        { wch: 15 },  // Fecha de Entrada
        { wch: 30 },  // Ingrediente
        { wch: 15 },  // Fecha de Expiración
        { wch: 15 },  // Proveedor
        { wch: 10 },  // Cantidad
        { wch: 20 },  // Usuario de Registro
        { wch: 15 }   // Monto Pagado ($)
    ];

    // Crear el libro y asignar nombre a la hoja
    const workbook: XLSX.WorkBook = { Sheets: { 'Reporte de Inventario': worksheet }, SheetNames: ['Reporte de Inventario'] };

    // Guardar el archivo Excel
    XLSX.writeFile(workbook, 'Inventario.xlsx');
}



}

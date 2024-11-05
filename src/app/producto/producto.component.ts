import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { ProductoService } from '../services/producto.service';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(private router: Router, private productoService: ProductoService) { }

  ngOnInit() {
    this.loadProducts();
  }


  verProducto(id: number): void {
    this.router.navigate(['/visualizar-producto', id]);
  }

  editarProducto(id: number): void {
    this.router.navigate(['/actualizar-producto', id]);
  }

  eliminarProducto(id: number): void {
    this.router.navigate(['/eliminar-producto', id]);
  }

  loadProducts(): void {
    this.productoService.getAllProductos().subscribe(
      (data: any[]) => {
        this.products = data;
        this.filteredProducts = data;
      },
      err => console.error(err)
    );
  }

  searchProduct(event: any): void {
    const valor = event.target.value.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(valor) ||
      product.description.toLowerCase().includes(valor)
    );
  }
  downloadPDF() {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();

    // Calcula el total parcial para cada producto y el subtotal general
    const productsWithTotals = this.filteredProducts.map(product => {
      return {
        ...product,
        totalParcial: `$ ${(product.qty * product.unitPrice).toFixed(2)}`
      };
    });

    const subtotal = productsWithTotals.reduce((acc, product) => acc + parseFloat(product.totalParcial.replace('$ ', '')), 0).toFixed(2);
    const iva = (parseFloat(subtotal) * 0.15).toFixed(2);
    const total = (parseFloat(subtotal) + parseFloat(iva)).toFixed(2);

    // Configurar el encabezado y la tabla de productos
    (doc as any).autoTable({
      body: [
        // Título del reporte
        [
          { content: 'Reporte de productos', colSpan: 6, styles: { halign: 'center', fillColor: [22, 160, 133], textColor: 255, fontSize: 14, fontStyle: 'bold' } }
        ],
        // Nombre del negocio
        [
          { content: 'Nombre del negocio: Donibites', colSpan: 6, styles: { fontStyle: 'bold', halign: 'left' } }
        ],
        [
          { content: 'Direccion: Pista Juan Pablo Segundo, Managua, Nicaragua.', colSpan: 6, styles: { fontStyle: 'bold', halign: 'left' } }
        ],
        // Fecha de generación
        [
          { content: 'Fecha de generación: ' + currentDate, colSpan: 6, styles: { fontStyle: 'bold', halign: 'left' } }
        ],
        // Encabezado de la tabla de productos
        [
          { content: 'ID', styles: { halign: 'center', fillColor: [22, 160, 133], textColor: 255 } },
          { content: 'Nombre', styles: { fillColor: [22, 160, 133], textColor: 255 } },
          { content: 'Descripción', styles: { fillColor: [22, 160, 133], textColor: 255 } },
          { content: 'Existencias', styles: { halign: 'center', fillColor: [22, 160, 133], textColor: 255 } },
          { content: 'Precio ($)', styles: { halign: 'center', fillColor: [22, 160, 133], textColor: 255 } },
          { content: 'Total Parcial ($)', styles: { halign: 'center', fillColor: [22, 160, 133], textColor: 255 } }
        ],
        // Datos de los productos
        ...productsWithTotals.map(product => [
          { content: product.id.toString(), styles: { halign: 'center' } },
          { content: product.name },
          { content: product.description },
          { content: product.qty.toString(), styles: { halign: 'center' } },
          { content: `$ ${product.unitPrice.toFixed(2)}`, styles: { halign: 'center' } },
          { content: product.totalParcial, styles: { halign: 'center' } }
        ]),
        // Subtotales y totales con símbolo de córdoba
        [
          { content: 'Subtotal', colSpan: 5, styles: { halign: 'right', fontStyle: 'bold' } },
          { content: `$ ${subtotal}`, styles: { halign: 'center' } }
        ],
        [
          { content: 'IVA (15%)', colSpan: 5, styles: { halign: 'right', fontStyle: 'bold' } },
          { content: `$ ${iva}`, styles: { halign: 'center' } }
        ],
        [
          { content: 'Total', colSpan: 5, styles: { halign: 'right', fontStyle: 'bold' } },
          { content: `$ ${total}`, styles: { halign: 'center' } }
        ]
      ]
    });

    doc.save('reporte_productos.pdf');
  }


  // Método para descargar en Excel
  downloadExcel() {
    // Encabezado del reporte con estilos
    const headerInfo = [
      [{ v: 'Reporte de productos', s: { font: { bold: true, sz: 14 }, fill: { fgColor: { rgb: "16A085" } }, alignment: { horizontal: 'center', vertical: 'center' }, color: { rgb: "FFFFFF" } } }],
      [{ v: 'Nombre del negocio: Donibites', s: { font: { bold: true, sz: 12 }, alignment: { horizontal: 'left' } } }],
      [{ v: 'Dirección: Avenida Juan Pablo Segundo, Managua, Nicaragua', s: { font: { bold: true, sz: 12 }, alignment: { horizontal: 'left' } } }],
      [{ v: 'Fecha de generación: ' + new Date().toLocaleDateString(), s: { font: { bold: true, sz: 12 }, alignment: { horizontal: 'left' } } }],
      [] // Espacio en blanco para separar encabezado de la tabla de productos
    ];

    // Encabezados de la tabla de productos con estilos
    const headers = [
      [{ v: 'ID', s: { font: { bold: true }, fill: { fgColor: { rgb: "1ABC9C" } }, alignment: { horizontal: 'center', vertical: 'center' }, color: { rgb: "FFFFFF" } } },
       { v: 'Nombre', s: { font: { bold: true }, fill: { fgColor: { rgb: "1ABC9C" } }, alignment: { horizontal: 'center' }, color: { rgb: "FFFFFF" } } },
       { v: 'Descripción', s: { font: { bold: true }, fill: { fgColor: { rgb: "1ABC9C" } }, alignment: { horizontal: 'center' }, color: { rgb: "FFFFFF" } } },
       { v: 'Existencias', s: { font: { bold: true }, fill: { fgColor: { rgb: "1ABC9C" } }, alignment: { horizontal: 'center' }, color: { rgb: "FFFFFF" } } },
       { v: 'Precio ($)', s: { font: { bold: true }, fill: { fgColor: { rgb: "1ABC9C" } }, alignment: { horizontal: 'center' }, color: { rgb: "FFFFFF" } } },
       { v: 'Total Parcial ($)', s: { font: { bold: true }, fill: { fgColor: { rgb: "1ABC9C" } }, alignment: { horizontal: 'center' }, color: { rgb: "FFFFFF" } } }]
    ];

    // Datos de la tabla de productos, manteniendo los valores numéricos para cálculos y agregando el símbolo $ para visualización
    const data = this.filteredProducts.map(product => {
      const totalParcial = product.qty * product.unitPrice;
      return [
        product.id,
        product.name,
        product.description,
        product.qty,
        `$${product.unitPrice.toFixed(2)}`,               // Precio con $
        `$${totalParcial.toFixed(2)}`                     // Total Parcial con $
      ];
    });

    // Cálculo del subtotal, IVA, y total sin el símbolo $
    const subtotal = this.filteredProducts.reduce((acc, product) => acc + (product.qty * product.unitPrice), 0).toFixed(2);
    const iva = (parseFloat(subtotal) * 0.15).toFixed(2);
    const total = (parseFloat(subtotal) + parseFloat(iva)).toFixed(2);

    // Resumen final de Subtotal, IVA, y Total con el símbolo de $
    const summary = [
      [], // Línea en blanco
      [{}, {}, {}, {}, { v: 'Subtotal:', s: { font: { bold: true }, alignment: { horizontal: 'right' } } }, { v: `$${subtotal}`, s: { font: { bold: true }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: "D5DBDB" } } } }],
      [{}, {}, {}, {}, { v: 'IVA (15%):', s: { font: { bold: true }, alignment: { horizontal: 'right' } } }, { v: `$${iva}`, s: { font: { bold: true }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: "D5DBDB" } } } }],
      [{}, {}, {}, {}, { v: 'Total:', s: { font: { bold: true }, alignment: { horizontal: 'right' } } }, { v: `$${total}`, s: { font: { bold: true }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: "D5DBDB" } } } }]
    ];

    // Crear la hoja de cálculo y agregar el encabezado, los datos y el resumen
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([...headerInfo, ...headers, ...data, ...summary]);

    // Ajuste de ancho de columnas
    worksheet['!cols'] = [
      { wch: 5 },   // ID
      { wch: 20 },  // Nombre
      { wch: 40 },  // Descripción
      { wch: 12 },  // Existencias
      { wch: 10 },  // Precio
      { wch: 15 }   // Total Parcial
    ];

    // Crear el libro y asignar nombre a la hoja
    const workbook: XLSX.WorkBook = { Sheets: { 'Reporte de Productos': worksheet }, SheetNames: ['Reporte de Productos'] };

    // Guardar el archivo Excel
    XLSX.writeFile(workbook, 'Reporte_Productos.xlsx');
}



}

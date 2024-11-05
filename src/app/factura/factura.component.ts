import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx'; // Importar XLSX para Excel
import { FacturaService } from '../services/factura.service'; // Asegúrate de importar tu servicio

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  facturas: any[] = [];
  facturasFiltradas: any[] = [];

  constructor(private router: Router, private facturaService: FacturaService) { }

  ngOnInit() {
    this.cargarFacturas();
  }

  cargarFacturas(): void {
    this.facturaService.getAllFacturas().subscribe(
      (data: any[]) => {
        this.facturas = data;
        this.facturasFiltradas = data;
      },
      err => console.error(err)
    );
  }

  buscarFactura(event: any): void {
    const valor = event.target.value.toLowerCase();
    this.facturasFiltradas = this.facturas.filter(factura =>
      factura.description.toLowerCase().includes(valor) || // Filtrando por descripción
      factura.ruc.toLowerCase().includes(valor) // Filtrando por RUC
    );
  }

  // Método para descargar la lista en el formato especificado
  descargarLista(formato: string): void {
    if (formato === 'pdf') {
      this.descargarPDF();
    } else if (formato === 'excel') {
      this.downloadExcel();
    }
  }


  verFactura(id: number): void {
    this.router.navigate(['/visualizar-factura', id]);
  }

  editarFactura(id: number): void {
    this.router.navigate(['/actualizar-factura', id]);
  }

  eliminarFactura(id: number): void {
    this.router.navigate(['/eliminar-factura', id]);
  }

  agregarFactura(): void {
    this.router.navigate(['/agregar-factura']);
  }




  // Método para descargar en PDF
  descargarPDF(): void {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();

    // Calcula el monto total pagado para cada factura y el subtotal general
    const facturasWithTotals = this.facturasFiltradas.map(factura => {
        return {
            ...factura,
            paidAmountFormatted: `C$ ${(parseFloat(factura.paidAmount)).toFixed(2)}`
        };
    });

    const subtotal = facturasWithTotals.reduce((acc, factura) => acc + parseFloat(factura.paidAmount), 0).toFixed(2);
    const iva = (parseFloat(subtotal) * 0.15).toFixed(2);
    const total = (parseFloat(subtotal) + parseFloat(iva)).toFixed(2);

    // Configurar el encabezado y la tabla de facturas
    (doc as any).autoTable({
        body: [
            // Título del reporte
            [
                { content: 'Reporte de Facturas', colSpan: 7, styles: { halign: 'center', fillColor: [22, 160, 133], textColor: 255, fontSize: 14, fontStyle: 'bold' } }
            ],
            // Nombre del negocio
            [
                { content: 'Nombre del negocio: Donibites', colSpan: 7, styles: { fontStyle: 'bold', halign: 'left' } }
            ],
            [
                { content: 'Dirección: Avenida Juan Pablo Segundo, Managua, Nicaragua', colSpan: 7, styles: { fontStyle: 'bold', halign: 'left' } }
            ],
            // Fecha de generación
            [
                { content: 'Fecha de generación: ' + currentDate, colSpan: 7, styles: { fontStyle: 'bold', halign: 'left' } }
            ],
            // Encabezado de la tabla de facturas
            [
                { content: 'ID', styles: { halign: 'center', fillColor: [22, 160, 133], textColor: 255 } },
                { content: 'RUC', styles: { fillColor: [22, 160, 133], textColor: 255 } },
                { content: 'Descripción', styles: { fillColor: [22, 160, 133], textColor: 255 } },
                { content: 'Fecha de Factura', styles: { halign: 'center', fillColor: [22, 160, 133], textColor: 255 } },
                { content: 'Fecha de Pedido', styles: { halign: 'center', fillColor: [22, 160, 133], textColor: 255 } },
                { content: 'Estado', styles: { halign: 'center', fillColor: [22, 160, 133], textColor: 255 } },
                { content: 'Monto Pagado', styles: { halign: 'center', fillColor: [22, 160, 133], textColor: 255 } }
            ],
            // Datos de las facturas
            ...facturasWithTotals.map(factura => [
                { content: factura.id.toString(), styles: { halign: 'center' } },
                { content: factura.ruc },
                { content: factura.description },
                { content: new Date(factura.invoiceDate).toLocaleDateString(), styles: { halign: 'center' } },
                { content: new Date(factura.order.orderDate).toLocaleDateString(), styles: { halign: 'center' } },
                { content: factura.status, styles: { halign: 'center' } },
                { content: factura.paidAmountFormatted, styles: { halign: 'center' } }
            ]),
            // Subtotales y totales con el signo de córdoba
            [
                { content: 'Subtotal', colSpan: 6, styles: { halign: 'right', fontStyle: 'bold' } },
                { content: `C$ ${subtotal}`, styles: { halign: 'center' } }
            ],
            [
                { content: 'IVA (15%)', colSpan: 6, styles: { halign: 'right', fontStyle: 'bold' } },
                { content: `C$ ${iva}`, styles: { halign: 'center' } }
            ],
            [
                { content: 'Total', colSpan: 6, styles: { halign: 'right', fontStyle: 'bold' } },
                { content: `C$ ${total}`, styles: { halign: 'center' } }
            ]
        ]
    });

    doc.save('facturas.pdf');
}


  // Método para descargar en Excel
  downloadExcel() {
    // Encabezado del reporte con estilos
    const headerInfo = [
      [{ v: 'Reporte de Facturas', s: { font: { bold: true, sz: 14 }, fill: { fgColor: { rgb: "16A085" } }, alignment: { horizontal: 'center', vertical: 'center' }, color: { rgb: "FFFFFF" } } }],
      [{ v: 'Nombre del negocio: Donibites', s: { font: { bold: true, sz: 12 }, alignment: { horizontal: 'left' } } }],
      [{ v: 'Dirección: Avenida Juan Pablo Segundo, Managua, Nicaragua', s: { font: { bold: true, sz: 12 }, alignment: { horizontal: 'left' } } }],
      [{ v: 'Fecha de generación: ' + new Date().toLocaleDateString(), s: { font: { bold: true, sz: 12 }, alignment: { horizontal: 'left' } } }],
      [] // Espacio en blanco para separar el encabezado de la tabla de facturas
    ];

    // Encabezados de la tabla de facturas con estilos
    const headers = [
      [{ v: 'ID', s: { font: { bold: true }, fill: { fgColor: { rgb: "1ABC9C" } }, alignment: { horizontal: 'center' }, color: { rgb: "FFFFFF" } } },
       { v: 'RUC', s: { font: { bold: true }, fill: { fgColor: { rgb: "1ABC9C" } }, alignment: { horizontal: 'center' }, color: { rgb: "FFFFFF" } } },
       { v: 'Descripción', s: { font: { bold: true }, fill: { fgColor: { rgb: "1ABC9C" } }, alignment: { horizontal: 'center' }, color: { rgb: "FFFFFF" } } },
       { v: 'Fecha de Factura', s: { font: { bold: true }, fill: { fgColor: { rgb: "1ABC9C" } }, alignment: { horizontal: 'center' }, color: { rgb: "FFFFFF" } } },
       { v: 'Fecha de Pedido', s: { font: { bold: true }, fill: { fgColor: { rgb: "1ABC9C" } }, alignment: { horizontal: 'center' }, color: { rgb: "FFFFFF" } } },
       { v: 'Estado', s: { font: { bold: true }, fill: { fgColor: { rgb: "1ABC9C" } }, alignment: { horizontal: 'center' }, color: { rgb: "FFFFFF" } } },
       { v: 'Monto Pagado (C$)', s: { font: { bold: true }, fill: { fgColor: { rgb: "1ABC9C" } }, alignment: { horizontal: 'center' }, color: { rgb: "FFFFFF" } } }]
    ];

    // Datos de la tabla de facturas, con el monto pagado formateado
    const data = this.facturasFiltradas.map(factura => [
      factura.id,
      factura.ruc,
      factura.description,
      new Date(factura.invoiceDate).toLocaleDateString(),
      new Date(factura.order.orderDate).toLocaleDateString(),
      factura.status,
      `C$ ${parseFloat(factura.paidAmount).toFixed(2)}`
    ]);

    // Cálculo del subtotal, IVA, y total
    const subtotal = data.reduce((acc, factura) => acc + parseFloat(factura[6].replace('C$ ', '')), 0).toFixed(2);
    const iva = (parseFloat(subtotal) * 0.15).toFixed(2);
    const total = (parseFloat(subtotal) + parseFloat(iva)).toFixed(2);

    // Resumen final de Subtotal, IVA, y Total con estilos
    const summary = [
      [], // Línea en blanco
      [{}, {}, {}, {}, {}, { v: 'Subtotal:', s: { font: { bold: true }, alignment: { horizontal: 'right' } } }, { v: `C$ ${subtotal}`, s: { font: { bold: true }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: "D5DBDB" } } } }],
      [{}, {}, {}, {}, {}, { v: 'IVA (15%):', s: { font: { bold: true }, alignment: { horizontal: 'right' } } }, { v: `C$ ${iva}`, s: { font: { bold: true }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: "D5DBDB" } } } }],
      [{}, {}, {}, {}, {}, { v: 'Total:', s: { font: { bold: true }, alignment: { horizontal: 'right' } } }, { v: `C$ ${total}`, s: { font: { bold: true }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: "D5DBDB" } } } }]
    ];

    // Crear la hoja de cálculo y agregar el encabezado, los datos y el resumen
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([...headerInfo, ...headers, ...data, ...summary]);

    // Ajuste de ancho de columnas
    worksheet['!cols'] = [
      { wch: 5 },   // ID
      { wch: 15 },  // RUC
      { wch: 30 },  // Descripción
      { wch: 15 },  // Fecha de Factura
      { wch: 15 },  // Fecha de Pedido
      { wch: 12 },  // Estado
      { wch: 15 }   // Monto Pagado (C$)
    ];

    // Crear el libro y asignar nombre a la hoja
    const workbook: XLSX.WorkBook = { Sheets: { 'Reporte de Facturas': worksheet }, SheetNames: ['Reporte de Facturas'] };

    // Guardar el archivo Excel
    XLSX.writeFile(workbook, 'Reporte_Facturas.xlsx');
    // this.router.navigate(['/facturas']); // Asegúrate de que esta línea esté comentada o eliminada
}



}

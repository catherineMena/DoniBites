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

  // Método para descargar en PDF
  descargarPDF(): void {
    const doc = new jsPDF();
    const tableColumn = [
      "Id",
      "RUC",
      "Descripción",
      "Monto Pagado",
      "Estado",
      "Fecha de Factura",
      "Fecha de Pedido",
      "Descripción del Pedido"
    ]; // Definición de las columnas de la tabla
    const tableRows: any[] = [];

    this.facturasFiltradas.forEach(factura => {
      const facturaData = [
        factura.id,
        factura.ruc,
        factura.description,
        factura.paidAmount,
        factura.status,
        new Date(factura.invoiceDate).toLocaleDateString(), // Formateo de fecha de factura
        new Date(factura.order.orderDate).toLocaleDateString(), // Formateo de fecha de pedido
        factura.order.description // Descripción del pedido
      ]; // Ajustar según los atributos de tu factura
      tableRows.push(facturaData);
    });

    (doc as any).autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Lista de Facturas", 14, 15);
    doc.save('facturas.pdf');
  }

  // Método para descargar en Excel
  downloadExcel(): void {
    const headers = [
      ['Id', 'RUC', 'Descripción', 'Monto Pagado', 'Estado', 'Fecha de Factura', 'Fecha de Pedido', 'Descripción del Pedido']
    ]; // Encabezados para el archivo de Excel
    const data = this.facturasFiltradas.map(factura => [
      factura.id,
      factura.ruc,
      factura.description,
      factura.paidAmount,
      factura.status,
      new Date(factura.invoiceDate).toLocaleDateString(), // Formateo de fecha de factura
      new Date(factura.order.orderDate).toLocaleDateString(), // Formateo de fecha de pedido
      factura.order.description // Descripción del pedido
    ]);

    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([...headers, ...data]);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, 'facturas.xlsx');
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
}

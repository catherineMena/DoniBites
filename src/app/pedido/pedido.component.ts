import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx'; // Importar XLSX para Excel
import { PedidoService } from '../services/pedido.service'; // Servicio para gestionar pedidos

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  pedidos: any[] = [];
  pedidosFiltrados: any[] = [];

  constructor(private router: Router, private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.pedidoService.getAllPedidos().subscribe(
      (data: any[]) => {
        this.pedidos = data;
        this.pedidosFiltrados = data;
      },
      (error) => console.error('Error al cargar pedidos:', error)
    );
  }

  buscarPedido(event: any): void {
    const valor = event.target.value.toLowerCase();
    this.pedidosFiltrados = this.pedidos.filter(pedido =>
      pedido.description.toLowerCase().includes(valor) || // Filtrar por descripción
      pedido.status.toLowerCase().includes(valor) // Filtrar por estado
    );
  }

  descargarLista(formato: string): void {
    if (formato === 'pdf') {
      this.descargarPDF();
    } else if (formato === 'excel') {
      this.downloadExcel();
    }
  }

  descargarPDF(): void {
    const doc = new jsPDF();
    const tableColumn = [
      "Id", "Descripción", "Estado", "Fecha de Pedido",
      "Fecha de Entrega Esperada", "Fecha de Entrega", "Total"
    ]; // Columnas de la tabla
    const tableRows: any[] = [];

    this.pedidosFiltrados.forEach(pedido => {
      const pedidoData = [
        pedido.id,
        pedido.description,
        pedido.status,
        new Date(pedido.orderDate).toLocaleDateString(), // Formateo de fecha de pedido
        new Date(pedido.expectedDeliverDate).toLocaleDateString(), // Fecha esperada de entrega
        pedido.deliverDate ? new Date(pedido.deliverDate).toLocaleDateString() : 'N/A', // Fecha de entrega real
        this.calcularTotal(pedido.details) // Total del pedido
      ];
      tableRows.push(pedidoData);
    });

    (doc as any).autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Lista de Pedidos", 14, 15);
    doc.save('pedidos.pdf');
  }

  downloadExcel(): void {
    const headers = [
      ['Id', 'Descripción', 'Estado', 'Fecha de Pedido', 'Fecha de Entrega Esperada', 'Fecha de Entrega', 'Total']
    ]; // Encabezados de Excel
    const data = this.pedidosFiltrados.map(pedido => [
      pedido.id,
      pedido.description,
      pedido.status,
      new Date(pedido.orderDate).toLocaleDateString(),
      new Date(pedido.expectedDeliverDate).toLocaleDateString(),
      pedido.deliverDate ? new Date(pedido.deliverDate).toLocaleDateString() : 'N/A',
      this.calcularTotal(pedido.details)
    ]);

    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([...headers, ...data]);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, 'pedidos.xlsx');
  }

  calcularTotal(details: any[]): number {
    return details.reduce((total, item) => total + item.price, 0); // Calcular total sumando precios
  }

  verPedido(id: number): void {
    this.router.navigate(['/visualizar-pedido', id]);
  }

  editarPedido(id: number): void {
    this.router.navigate(['/actualizar-pedido', id]);
  }

  eliminarPedido(id: number): void {
    this.router.navigate(['/eliminar-pedido', id]);
  }

  agregarPedido(): void {
    this.router.navigate(['/agregar-pedido']);
  }
}

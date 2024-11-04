import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { OutgoingService } from '../services/outgoings.service';

// Definición de la interfaz para Outgoing
interface Outgoing {
  id: number;
  issueDate: string;
  ingredient: {
    id: number;
    name: string;
    unit: string;
    status: string;
  };
  expirationDate: string;
  qty: number;
  recordUser: number;
}

@Component({
  selector: 'app-outgoings',
  templateUrl: './outgoings.component.html',
  styleUrls: ['./outgoings.component.css']
})
export class OutgoingsComponent implements OnInit {
  outgoings: Outgoing[] = [];
  outgoingsFiltrados: Outgoing[] = [];

  constructor(private router: Router, private outgoingService: OutgoingService) { }

  ngOnInit() {
    this.cargarOutgoings();
  }

  cargarOutgoings(): void {
    this.outgoingService.getAllOutgoings().subscribe(
      (data: Outgoing[]) => {
        this.outgoings = data;
        this.outgoingsFiltrados = data;
      },
      err => console.error('Error al cargar outgoings:', err)
    );
  }

  buscarOutgoing(event: any): void {
    const valor = event.target.value.toLowerCase();
    this.outgoingsFiltrados = this.outgoings.filter(outgoing =>
      outgoing.ingredient.name.toLowerCase().includes(valor) ||
      outgoing.issueDate.toLowerCase().includes(valor) // Puedes añadir más filtros según sea necesario
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
      "Id",
      "Fecha de Emisión",
      "Ingrediente",
      "Unidad",
      "Cantidad",
      "Fecha de Expiración",
      "Usuario Registrador"
    ];
    const tableRows: any[] = [];

    this.outgoingsFiltrados.forEach(outgoing => {
      const outgoingData = [
        outgoing.id,
        new Date(outgoing.issueDate).toLocaleDateString(), // Formateo de fecha de emisión
        outgoing.ingredient.name,
        outgoing.ingredient.unit,
        outgoing.qty,
        new Date(outgoing.expirationDate).toLocaleDateString(), // Formateo de fecha de expiración
        outgoing.recordUser // Puedes formatear esto según necesites (ej. nombre de usuario)
      ];
      tableRows.push(outgoingData);
    });

    (doc as any).autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Lista de Ingredientes", 14, 15);
    doc.save('outgoings.pdf');
  }

  downloadExcel(): void {
    const headers = [
      ['Id', 'Fecha de Emisión', 'Ingrediente', 'Unidad', 'Cantidad', 'Fecha de Expiración', 'Usuario Registrador']
    ];
    const data = this.outgoingsFiltrados.map(outgoing => [
      outgoing.id,
      new Date(outgoing.issueDate).toLocaleDateString(),
      outgoing.ingredient.name,
      outgoing.ingredient.unit,
      outgoing.qty,
      new Date(outgoing.expirationDate).toLocaleDateString(),
      outgoing.recordUser // Igualmente, aquí puedes ajustar el formato
    ]);

    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([...headers, ...data]);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, 'outgoings.xlsx');
  }

  verOutgoing(id: number): void {
    this.router.navigate(['/visualizar-outgoing', id]);
  }

  editarOutgoing(id: number): void {
    this.router.navigate(['/actualizar-outgoing', id]);
  }

  eliminarOutgoing(id: number): void {
    this.router.navigate(['/eliminar-outgoing', id]);
  }

  agregarOutgoing(): void {
    this.router.navigate(['/agregar-outgoing']);
  }
}


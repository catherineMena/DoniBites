import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx'; // Importar XLSX para Excel
import { RolService } from '../services/rol.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {
  roles: any[] = [];
  rolesFiltrados: any[] = [];

  constructor(private router: Router, private rolService: RolService) { }

  ngOnInit() {
    this.cargarRoles();
  }

  cargarRoles(): void {
    this.rolService.getAllRoles().subscribe(
      (data: any[]) => {
        this.roles = data;
        this.rolesFiltrados = data;
      },
      err => console.error(err)
    );
  }

  buscarRol(event: any): void {
    const valor = event.target.value.toLowerCase();
    this.rolesFiltrados = this.roles.filter(rol =>
      rol.nombre.toLowerCase().includes(valor) // Asumiendo que cada rol tiene un atributo 'nombre'
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
    const tableColumn = ["Id", "Nombre"]; // Definición de las columnas de la tabla
    const tableRows: any[] = [];

    this.rolesFiltrados.forEach(rol => {
      const rolData = [rol.id, rol.nombre]; // Asumiendo que 'rol' tiene un atributo 'nombre'
      tableRows.push(rolData);
    });

    (doc as any).autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Lista de Roles", 14, 15);
    doc.save('roles.pdf');
  }

  // Método para descargar en Excel
  downloadExcel(): void {
    const headers = [['Id', 'Nombre']]; // Encabezados para el archivo de Excel
    const data = this.rolesFiltrados.map(rol => [rol.id, rol.nombre]);
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([...headers, ...data]);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, 'roles.xlsx');
  }

  verRol(id: number): void {
    this.router.navigate(['/visualizar-rol', id]);
  }

  editarRol(id: number): void {
    this.router.navigate(['/actualizar-rol', id]);
  }

  eliminarRol(id: number): void {
    this.router.navigate(['/eliminar-rol', id]);
  }

  agregarRol(): void {
    this.router.navigate(['/agregar-rol']);
  }
}

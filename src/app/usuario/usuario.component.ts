import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx'; // Importar XLSX para Excel
import { UsuarioService } from '../services/usuario.service'; // Asegúrate de tener un servicio para manejar usuarios

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuarios: any[] = [];
  usuariosFiltrados: any[] = [];

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getAllUsuarios().subscribe(
      (data: any[]) => {
        this.usuarios = data;
        this.usuariosFiltrados = data;
      },
      err => console.error(err)
    );
  }

  buscarUsuario(event: any): void {
    const valor = event.target.value.toLowerCase();
    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.completeName.toLowerCase().includes(valor) || // Filtra por nombre completo
      usuario.email.toLowerCase().includes(valor) // Filtra por email
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
    const tableColumn = ["ID", "Username", "Email", "Rol", "Nombre Completo", "Teléfono", "Estado"]; // Definición de las columnas de la tabla
    const tableRows: any[] = [];

    this.usuariosFiltrados.forEach(usuario => {
      const usuarioData = [
        usuario.id,
        usuario.username,
        usuario.email,
        usuario.rol.name, // Acceder al nombre del rol
        usuario.completeName,
        usuario.phone,
        usuario.status
      ];
      tableRows.push(usuarioData);
    });

    (doc as any).autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Lista de Usuarios", 14, 15);
    doc.save('usuarios.pdf');
  }

  // Método para descargar en Excel
  downloadExcel(): void {
    const headers = [['ID', 'Username', 'Email', 'Rol', 'Nombre Completo', 'Teléfono', 'Estado']]; // Encabezados para el archivo de Excel
    const data = this.usuariosFiltrados.map(usuario => [
      usuario.id,
      usuario.username,
      usuario.email,
      usuario.rol.name, // Acceder al nombre del rol
      usuario.completeName,
      usuario.phone,
      usuario.status
    ]);
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([...headers, ...data]);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, 'usuarios.xlsx');
  }

  verUsuario(id: number): void {
    this.router.navigate(['/visualizar-usuario', id]);
  }

  editarUsuario(id: number): void {
    this.router.navigate(['/actualizar-usuario', id]);
  }

  eliminarUsuario(id: number): void {
    this.router.navigate(['/eliminar-usuario', id]);
  }

  agregarUsuario(): void {
    this.router.navigate(['/agregar-usuario']);
  }
}

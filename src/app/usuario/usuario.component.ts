import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
      usuario.username.toLowerCase().includes(valor) ||
      usuario.email.toLowerCase().includes(valor) ||
      usuario.completeName.toLowerCase().includes(valor)
    );
  }

  descargarLista(): void {
    const doc = new jsPDF();
    const tableColumn = ["Id", "Nombre de usuario", "Email", "Rol ID", "Nombre del Rol", "Descripción", "Nombre completo", "Dirección", "Teléfono", "Estado"];
    const tableRows: any[] = [];

    this.usuariosFiltrados.forEach(usuario => {
      const usuarioData = [
        usuario.id,
        usuario.username,
        usuario.email,
        usuario.rol.id,
        usuario.rol.name,
        usuario.rol.description,
        usuario.completeName,
        usuario.address,
        usuario.phone,
        usuario.status
      ];
      tableRows.push(usuarioData);
    });

    (doc as any).autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Lista de Usuarios", 14, 15);
    doc.save('usuarios.pdf');
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
}

import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../services/proveedores.service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  proveedores: any[] = [];
  proveedoresFiltrados: any[] = [];

  constructor(private router: Router, private proveedoresService: ProveedoresService) { }

  ngOnInit() {
    this.cargarProveedores();
  }

  cargarProveedores(): void {
    this.proveedoresService.getAllProviders().subscribe(
      (data: any[]) => {
        this.proveedores = data;
        this.proveedoresFiltrados = data;
      },
      err => console.error(err)
    );
  }

  buscarProveedor(event: any): void {
    const valor = event.target.value.toLowerCase();
    this.proveedoresFiltrados = this.proveedores.filter(proveedor =>
      proveedor.name.toLowerCase().includes(valor) ||
      proveedor.email.toLowerCase().includes(valor) ||
      proveedor.address.toLowerCase().includes(valor)
    );
  }

  descargarLista(): void {
    const doc = new jsPDF();
    const tableColumn = ["Id", "Nombre", "Email", "Dirección", "Teléfono"];
    const tableRows: any[] = [];

    this.proveedoresFiltrados.forEach(proveedor => {
      const proveedorData = [
        proveedor.id,
        proveedor.name,
        proveedor.email,
        proveedor.address,
        proveedor.phone
      ];
      tableRows.push(proveedorData);
    });

    (doc as any).autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Lista de Proveedores", 14, 15);
    doc.save('proveedores.pdf');
  }

  seeProvider(id: number): void {
    this.router.navigate(['/visualizar-proveedor', id]);
  }

  editProvider(id: number): void {
    this.router.navigate(['/actualizar-proveedor', id]);
  }

  deleteProvider(id: number): void {
    this.router.navigate(['/eliminar-proveedor', id]);
  }
}

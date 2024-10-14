import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../services/proveedores.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css'],
})
export class ProveedoresComponent implements OnInit {
  providers: any[] = [];
  filteredProviders: any[] = [];

  constructor(
    private router: Router,
    private proveedoresService: ProveedoresService
  ) {}

  ngOnInit() {
    this.cargarProveedores();
  }

  cargarProveedores(): void {
    this.proveedoresService.getAllProviders().subscribe(
      (data: any[]) => {
        this.providers = data;
        this.filteredProviders = data;
      },
      (err) => console.error(err)
    );
  }

  searchProvider(event: any): void {
    const valor = event.target.value.toLowerCase();
    this.filteredProviders = this.providers.filter(
      (providers) =>
        providers.name.toLowerCase().includes(valor) ||
        providers.email.toLowerCase().includes(valor) ||
        providers.address.toLowerCase().includes(valor)
    );
  }

  // downloadList(): void {
  //   const doc = new jsPDF();
  //   const tableColumn = ["Id", "Nombre", "Email", "Dirección", "Teléfono"];
  //   const tableRows: any[] = [];

  //   this.proveedoresFiltrados.forEach(proveedor => {
  //     const proveedorData = [
  //       proveedor.id,
  //       proveedor.name,
  //       proveedor.email,
  //       proveedor.address,
  //       proveedor.phone
  //     ];
  //     tableRows.push(proveedorData);
  //   });

  //   (doc as any).autoTable(tableColumn, tableRows, { startY: 20 });
  //   doc.text("Lista de Proveedores", 14, 15);
  //   doc.save('proveedores.pdf');
  // }

  downloadList(format: string) {
    if (format === 'pdf') {
      this.downloadPDF();
    } else if (format === 'excel') {
      this.downloadExcel();
    }
  }

  // Método para descargar en PDF
  downloadPDF() {
    const doc = new jsPDF();
    doc.text('Tabla de Ingredientes', 10, 10);
    (doc as any).autoTable({
      head: [['Id', 'Nombre', 'Correo electronico', 'Dirección', 'Teléfono']],
      body: this.filteredProviders.map((provider) => [
        provider.id,
        provider.name,
        provider.email,
        provider.address,
        provider.phone,
      ]),
    });
    doc.save('Ingredientes.pdf');
  }

  // Método para descargar en Excel
  downloadExcel() {
    const headers = [['Id', 'Nombre', 'Correo electronico', 'Dirección', 'Teléfono']];
    const data = this.filteredProviders.map((provider) => [
      provider.id,
      provider.name,
      provider.email,
      provider.address,
      provider.phone,
    ]);
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
      ...headers,
      ...data,
    ]);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    XLSX.writeFile(workbook, 'Ingredientes.xlsx');
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



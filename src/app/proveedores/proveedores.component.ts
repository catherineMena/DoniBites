import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../services/proveedores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent implements OnInit{
  proveedores: any = [];

  constructor(private router: Router, private proveedoresService: ProveedoresService) { }


  ngOnInit() {
    this.obtainProviders();
  }


  obtainProviders(): void {
    this.proveedoresService.getAllProviders().subscribe(
      res => {
        this.proveedores = res;
      },
      err => console.error(err)
    );
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

import { Component, OnInit } from '@angular/core';
import {IngredientService} from '../services/ingredient.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.css']
})

export class IngredientesComponent implements OnInit {
  ingredients: any[] = [];
  filterIngredient: any[] = [];

  constructor(private router: Router, private ingredientService: IngredientService) { }

  ngOnInit() {
    this.loadIngredient();
  }

  viewIngredient(id: number): void {
    this.router.navigate(['/view-ingredient', id]);
  }

  editIngredient(id: number): void {
    this.router.navigate(['/update-ingredient', id]);
  }

deleteIngredient(id: number): void {
    this.router.navigate(['/delete-ingredient', id]);
  }

  loadIngredient(): void {
    this.ingredientService.getAllIngredients().subscribe(
      (data: any) => {
        this.ingredients = data;
        this.filterIngredient = data;
      },
      err => {
        console.error('Error al cargar los ingredientes:', err);
        this.ingredients = [];
        this.filterIngredient = [];
      }
    );
  }

  searchIngredient(event: any): void {
    const valor = event.target.value.toLowerCase();
    this.filterIngredient = this.ingredients.filter(ingredient =>
      ingredient.name.toLowerCase().includes(valor)
    );
  }



  downloadList(formato: string) {
    if (formato === 'pdf') {
      this.downloadPDF();
    } else if (formato === 'excel') {
      this.downloadExcel();
    }
  }

  // Método para descargar en PDF
  downloadPDF() {
    const doc = new jsPDF();
    doc.text('Tabla de Ingredientes', 10, 10);
    (doc as any).autoTable({
      head: [['Id', 'Nombre', 'Unidad']],
      body: this.filterIngredient.map(ingredient => [ingredient.id, ingredient.name, ingredient.unit])    });
    doc.save('Ingredientes.pdf');
  }

  // Método para descargar en Excel
  downloadExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filterIngredient);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, 'Ingredientes.xlsx');
  }
}





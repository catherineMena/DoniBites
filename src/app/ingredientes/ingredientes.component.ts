import { Component, OnInit } from '@angular/core';
import {IngredientService} from '../services/ingredient.service';
import { Router } from '@angular/router';

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
      ingredient.name.toLowerCase().includes(valor) ||
      ingredient.unit.toLowerCase().includes(valor)
    );
  }



  downloadList(): void {
    const doc = new jsPDF();
    const tableColumn = ["Id", "Nombre", "Unidad de medida"];
    const tableRows: any[] = [];

    this.filterIngredient.forEach(ingredient => {
      const ingredientData = [
        ingredient.id,
        ingredient.ingredient,
        ingredient.unit
      ];
      tableRows.push(ingredientData);
    });

    (doc as any).autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Lista de  ingredientes", 14, 15);
    doc.save('Ingredientes.pdf');
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
}


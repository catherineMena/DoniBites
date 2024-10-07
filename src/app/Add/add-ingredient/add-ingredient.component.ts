import { Component } from '@angular/core';
import { IngredientService } from '../../services/ingredient.service';
import { Router } from '@angular/router';

import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrl: './add-ingredient.component.css'
})
export class AddIngredientComponent {
  ingredient: string = '';
  unit: string = '';

  constructor(private ingredientService: IngredientService, private router: Router) { }

  saveIngredient(): void {
    if (this.ingredient.trim() === '' || this.unit.trim() === '') {
      Toastify({
        text: "Por favor, completa todos los campos.",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "rgba(145, 142, 244)",
      }).showToast();
      return;
    }

    const newIngredient = {

      name: this.ingredient,
      unit: this.unit // Incluimos la unidad en el objeto que se envía
    };

    this.ingredientService.createIngredient(newIngredient).subscribe(
      (response: any) => {
        console.log('El ingrediente se ha guardado con éxito:', response);
        Toastify({
          text: "El ingrediente se ha guardado con éxito",
          duration: 3000,
          gravity: "top",
          position: "center",
          backgroundColor: "#36CB7C",
        }).showToast();
        this.router.navigate(['/ingredient']);
      },
      (error: any) => {
        console.error('Error al guardar ingrediente:', error);
        Toastify({
          text: "Error al guardar ingrediente. Inténtalo de nuevo.",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#ff5f6d",
        }).showToast();
      }
    );
  }
}

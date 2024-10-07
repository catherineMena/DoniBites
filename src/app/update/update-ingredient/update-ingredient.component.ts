import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../services/ingredient.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-ingredient',

  templateUrl: './update-ingredient.component.html',
  styleUrl: './update-ingredient.component.css'
})
export class UpdateIngredientComponent implements OnInit {
  id: number = 0;
  ingredient: string = '';
  unit: string = '';

  constructor(private ingredientService: IngredientService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.ingredientService.getIngredientById(this.id).subscribe(
        (res: any) => {
          this.ingredient = res.name;
          this.unit = res.unit;
        },
        err => console.error(err)
      );
    });
  }

  updateIngredient(): void {
    if (this.ingredient.trim() === '') {
      alert('Por favor, completa el nombre del ingrediente.');
      return;
    }

    const ingredientUpdated = {
      id: this.id,
      name: this.ingredient,
      unit: this.unit
    };

    this.ingredientService.updateIngredient(this.id, ingredientUpdated).subscribe(
      (response: any) => {
        console.log('Ingrediente actualizado con éxito:', response);
        this.router.navigate(['/ingredient']);
      },
      (error: any) => {
        console.error('Error al actualizar ingrediente:', error);
        alert('Error al actualizar ingrediente. Por favor, inténtalo de nuevo.');
      }
    );
  }
}

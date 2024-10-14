import { Component } from '@angular/core';
import { IngredientService } from '../../services/ingredient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-ingredient',
  templateUrl: './delete-ingredient.component.html',
  styleUrl: './delete-ingredient.component.css'
})
export class DeleteIngredientComponent {
  id: number = 0;
  ingredient: any = {};
  unit: string = '';

  constructor(private ingredientService: IngredientService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.ingredientService.getIngredientById(this.id).subscribe(
        (res: any) => {
          this.ingredient = res;
        },
        err => console.error(err)
      );
    });
  }

  deactivateIngredient(): void {
    this.ingredientService.deactivateIngredient(this.id).subscribe(
      () => {
        console.log('Ingrediente desactivado con éxito');
        this.router.navigate(['/ingredientes']); // Redirige a la lista de ingredientes u otra página
      },
      (error: any) => {
        console.error('Error al desactivar el ingrediente:', error);
        alert('Error al desactivar el ingrediente. Por favor, inténtalo de nuevo.');
      }
    );
  }
}

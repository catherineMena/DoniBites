import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredientService } from '../../services/ingredient.service';

@Component({
  selector: 'app-delete-ingredient',
  templateUrl: './delete-ingredient.component.html',
  styleUrls: ['./delete-ingredient.component.css']
})
export class DeleteIngredientComponent implements OnInit {
  id: number = 0;
  ingrediente: any = {};

  constructor(private ingredientService: IngredientService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.ingredientService.getIngredientById(this.id).subscribe(
        (res: any) => {
          this.ingrediente = res;
        },
        err => console.error(err)
      );
    });
  }

  eliminarIngrediente(): void {
    this.ingredientService.deleteIngredient(this.id).subscribe(
      () => {
        console.log('Ingrediente eliminado con éxito');
        this.router.navigate(['/ingredientes']); // Redirige a la lista de ingredientes u otra página según tu flujo
      },
      (error: any) => {
        console.error('Error al eliminar el ingrediente:', error);
        alert('Error al eliminar el ingrediente. Por favor, inténtalo de nuevo.');
      }
    );
  }
}

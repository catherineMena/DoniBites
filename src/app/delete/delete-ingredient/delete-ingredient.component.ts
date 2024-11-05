import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
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
        Toastify({
          text: "Ingrediente eliminado con éxito",
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          backgroundColor: "#36CB7C",
        }).showToast();
        this.router.navigate(['/ingredient']); // Redirige a la lista de ingredientes u otra página según tu flujo
      },
      (error: any) => {
        console.error('Error al eliminar el ingrediente:', error);
        Toastify({
          text: "Error al eliminar el ingrediente. Por favor, inténtalo de nuevo.",
          duration: 3000,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          backgroundColor: "#ff5f6d",
        }).showToast();
      }
    );
  }
}

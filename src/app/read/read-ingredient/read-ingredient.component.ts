import { Component, OnInit } from '@angular/core';
import { IngredientesComponent } from '../../ingredientes/ingredientes.component';
import { IngredientService } from '../../services/ingredient.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-read-ingredient',
  templateUrl: './read-ingredient.component.html',
  styleUrl: './read-ingredient.component.css'
})
export class ReadIngredientComponent implements OnInit {
  ingredient: any;
  unit: string = '';

  constructor(private ingredientService: IngredientService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const ingredientId = +params['id'];
      this.getIngredientById(ingredientId);
    });
  }

  getIngredientById(id: number): void {
    this.ingredientService.getIngredientById(id).subscribe(
      res => {
        this.ingredient = res;
        this.unit = res.unit;
      },
      err => console.error(err)
    );
  }
}

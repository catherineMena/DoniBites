import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import { IngredientService } from '../../services/ingredient.service';
import { OutgoingService } from '../../services/outgoings.service';

interface Ingredient {
  id: number;
  name: string;
  unit: string;
  status: string;
}

interface Outgoing {
  id: number;
  issueDate: string;
  ingredient: Ingredient;
  expirationDate: string;
  qty: number;
  recordUser: number;
}

@Component({
  selector: 'app-actualizar-outgoings',
  templateUrl: './actualizar-outgoings.component.html',
  styleUrls: ['./actualizar-outgoings.component.css']
})
export class ActualizarOutgoingsComponent implements OnInit {
  outgoing: Outgoing = {
    id: 0,
    issueDate: '',
    ingredient: { id: 0, name: '', unit: '', status: '' },
    expirationDate: '',
    qty: 0,
    recordUser: 0,
  };

  ingredientes: Ingredient[] = [];
  selectedIngredient!: Ingredient;

  constructor(
    private outgoingService: OutgoingService,
    private route: ActivatedRoute,
    private ingredientService: IngredientService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const outgoingId = +params['id'];
      this.obtenerOutgoingPorId(outgoingId);
    });
    this.cargarIngredientes();
  }

  obtenerOutgoingPorId(id: number): void {
    this.outgoingService.getOutgoingById(id).subscribe(
      res => {
        this.outgoing = res;
        this.outgoing.issueDate = this.formatearFecha(this.outgoing.issueDate);
        this.outgoing.expirationDate = this.formatearFecha(this.outgoing.expirationDate);
        this.selectedIngredient = this.outgoing.ingredient;
      },
      err => {
        console.error('Error al obtener outgoing:', err);
        alert('No se pudo obtener el outgoing.');
      }
    );
  }

  formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toISOString().split('T')[0];
  }

  cargarIngredientes(): void {
    this.ingredientService.getAllIngredients().subscribe(
      res => this.ingredientes = res,
      err => console.error('Error al cargar ingredientes:', err)
    );
  }

  onIngredientChange(event: any): void {
    const selectedId = +event.target.value;
    const foundIngredient = this.ingredientes.find(ing => ing.id === selectedId);

    if (foundIngredient) {
      this.selectedIngredient = foundIngredient;
      this.outgoing.ingredient = { ...this.selectedIngredient };
      this.outgoing.ingredient.unit = this.selectedIngredient.unit;
    } else {
      console.error('Ingrediente no encontrado');
    }
  }

  actualizarOutgoing(): void {
    // Verifica si el formulario es válido antes de enviar
    if (this.outgoing.issueDate && this.outgoing.expirationDate && this.outgoing.qty > 0) {
      this.outgoingService.updateOutgoing(this.outgoing.id, this.outgoing).subscribe(
        res => {
          console.log('Outgoing actualizado con éxito:', res);
          Toastify({
            text: "Salida actualizada con éxito",
            duration: 3000,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            backgroundColor: "#36CB7C",
          }).showToast();
          this.router.navigate(['/outgoings']);
        },
        err => {
          console.error('Error al actualizar el outgoing:', err);
          Toastify({
            text: "Error al actualizar la salida. Por favor, inténtalo de nuevo.",
            duration: 3000,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            backgroundColor: "#ff5f6d",
          }).showToast();        }
      );
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }
}

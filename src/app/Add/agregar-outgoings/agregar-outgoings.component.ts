import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IngredientService } from '../../services/ingredient.service';
import { OutgoingService } from '../../services/outgoings.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-agregar-outgoings',
  templateUrl: './agregar-outgoings.component.html',
  styleUrls: ['./agregar-outgoings.component.css']
})
export class AgregarOutgoingComponent implements OnInit {
  id: number = 0; // Asegúrate de iniciar el ID en un valor por defecto
  ingredientId: number = 0; // Cambiado a 0 para evitar null
  ingredientUnit: string = ''; // Campo para la unidad del ingrediente
  issueDate: string = new Date().toISOString().split('T')[0]; // Fecha de emisión por defecto
  expirationDate: string = new Date().toISOString().split('T')[0]; // Fecha de expiración por defecto
  qty: number = 1; // Cantidad por defecto
  recordUser: number = 1; // Puedes ajustar esto según la lógica de tu aplicación
  ingredients: any[] = []; // Array para almacenar los ingredientes

  constructor(
    private outgoingService: OutgoingService,
    private ingredientService: IngredientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarIngredientes(); // Cargar ingredientes al inicializar
  }

  cargarIngredientes(): void {
    this.ingredientService.getAllIngredients().subscribe(
      (data: any) => {
        this.ingredients = data; // Asignar los ingredientes al array
      },
      (error: any) => {
        console.error('Error al cargar los ingredientes:', error);
      }
    );
  }

  guardarOutgoing(): void {
    // Validar que todos los campos necesarios estén completos
    if (
      this.ingredientId <= 0 || // Verificar que el ID del ingrediente sea válido
      this.qty <= 0 ||
      this.issueDate.trim() === '' ||
      this.expirationDate.trim() === '' ||
      this.ingredientUnit.trim() === ''
    ) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    // Crear el objeto nuevo de outgoing
    const newOutgoing = {
      id: this.id, // ID del outgoing
      issueDate: this.issueDate + 'T00:00:00.000Z', // Formato ISO para la fecha de emisión
      ingredient: {
        id: this.ingredientId, // ID del ingrediente seleccionado
        unit: this.ingredientUnit // Unidad del ingrediente
      },
      expirationDate: this.expirationDate + 'T00:00:00.000Z', // Formato ISO para la fecha de expiración
      qty: this.qty, // Cantidad
      recordUser: this.recordUser // Usuario que registra
    };

    // Llamar al servicio para guardar el outgoing
    this.outgoingService.crearOutgoing(newOutgoing).subscribe(
      (response: any) => {
        console.log('Salida guardada con éxito:', response);
        this.router.navigate(['/outgoings']); // Redirigir a la lista de outgoings
      },
      (error: any) => {
        console.error('Error al guardar la salida:', error);
        const errorMessage = error.error?.message || 'Error desconocido';
        alert(`Error al guardar la salida: ${errorMessage}`);
      }
    );
  }

  onIngredientChange(event: any): void {
    this.ingredientId = +event.target.value; // Asignar el ID del ingrediente seleccionado
    const selectedIngredient = this.ingredients.find(ingredient => ingredient.id === this.ingredientId);
    if (selectedIngredient) {
      this.ingredientUnit = selectedIngredient.unit; // Obtener unidad del ingrediente seleccionado
    } else {
      this.ingredientUnit = ''; // Restablecer unidad si no se encuentra el ingrediente
    }
  }

  // Métodos para manejar cambios en los campos
  onQtyChange(event: any): void {
    this.qty = +event.target.value; // Asignar la cantidad ingresada
  }

  onIssueDateChange(event: any): void {
    this.issueDate = event.target.value; // Asignar la fecha de emisión
  }

  onExpirationDateChange(event: any): void {
    this.expirationDate = event.target.value; // Asignar la fecha de expiración
  }
}

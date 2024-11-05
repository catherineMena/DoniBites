import { Component } from '@angular/core';
import { RecuperarPwdService } from '../services/recuperar-pwd.service';
import { Router } from '@angular/router';
import Toastify from 'toastify-js';

@Component({
  selector: 'app-recuperar-pwd',
  templateUrl: './recuperar-pwd.component.html',
  styleUrl: './recuperar-pwd.component.css'
})
export class RecuperarPwdComponent {
  usuario: string = '';

  constructor(private recuperarPwdService: RecuperarPwdService, private router: Router) { }

  enviarUsuario(): void {
    if (this.usuario.trim() === '') {
      Toastify({
        text: "Por favor, completa todos los campos antes de enviar",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "rgba(145, 142, 244)",
      }).showToast();
      return;
    }


  this.recuperarPwdService.crearContraseña(this.usuario).subscribe(
    (response: any) => {
      console.log('Resultado:', response.message);
      Toastify({
        text: response.message,
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "#bcb5f5",
      }).showToast();
      this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Error al enviar la contraseña', error);
        Toastify({
          text: "Error al enviar la contraseña " + error,
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#ff5f6d",
        }).showToast();
      }
    );
  }
}

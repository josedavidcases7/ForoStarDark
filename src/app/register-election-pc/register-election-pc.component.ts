import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // Asegúrate de que esté bien importado

@Component({
  selector: 'app-register-election-pc',
  standalone: true,  // Esto marca el componente como autónomo
  imports: [CommonModule, FormsModule, HttpClientModule],  // Aquí debes importar HttpClientModule
  providers: [AuthService],  // AuthService debe estar en providers
  templateUrl: './register-election-pc.component.html',
  styleUrls: ['./register-election-pc.component.scss']
})
export class RegisterElectionPcComponent {
  loginImage: string = 'assets/images/logo.png';
  titleEmail: string = 'Email';
  username: string = 'Usuario';
  titlePassword: string = 'Contraseña';

  user = {
    user_name: '',
    email: '',
    password: ''
  };

  constructor(private router: Router, private authService: AuthService) {}

  // Función de registro
  onRegister() {
    console.log("Datos del usuario enviados: ", this.user);  // Verifica que los datos estén siendo enviados correctamente

    // Llamada al servicio de autenticación para registrar al usuario
    this.authService.register(this.user).subscribe(
      (response) => {
        console.log('Usuario registrado con éxito', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error al registrar usuario', error);
      }
    );
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}

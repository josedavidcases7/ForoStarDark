// login-election-pc.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';  
import { AuthService } from '../services/auth.service';  
import { FormsModule } from '@angular/forms';  
import { HttpClientModule } from '@angular/common/http';  

@Component({
  selector: 'app-login-election-pc',
  standalone: true,  
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],  
  providers: [AuthService],  
  templateUrl: './login-election-pc.component.html',
  styleUrls: ['./login-election-pc.component.scss']
})
export class LoginElectionPcComponent {
  loginImage: string = 'assets/images/logo.png';
  username_email: string = 'Usuario o Email';
  titlePassword: string = 'Contraseña';

  user = {
    user_name: '',
    email: '',
    password: ''
  };

  errorMessage: string = '';  

  constructor(private router: Router, private authService: AuthService) {}  
  
  // login-election-pc.component.ts

onLogin(isAdmin: boolean = false) {
  const loginData = {
    login: this.user.email,  // 'login' en lugar de 'email'
    password: this.user.password
  };

  console.log('📤 Enviando datos al backend:', loginData); // Verifica lo que se está enviando

  // Llamamos a la función de login pasando el parámetro isAdmin
  this.authService.login(loginData, isAdmin).subscribe(
    (response) => {
      console.log('✅ Inicio de sesión exitoso', response); // Ver toda la respuesta del backend

      // Verifica si 'user_name' existe en la respuesta
      if (response && response.user_name) {
        localStorage.setItem('username', response.user_name);
        console.log('Usuario guardado en localStorage:', response.user_name);  // Verifica que se guardó correctamente
      } else {
        console.error('No se encontró el user_name en la respuesta');
      }

      // Navega a la página de inicio
      this.router.navigate(['/home']);
    },
    (error) => {
      console.error('❌ Error al iniciar sesión', error);
      this.errorMessage = error.error.message || 'Usuario o contraseña incorrectos';
    }
  );
}

}

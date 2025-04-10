import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register-election-pc',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [AuthService],
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

  // Variables para almacenar los mensajes de error
  usernameError: string = '';
  passwordError: string = '';
  emailError: string = '';
  userNameExistError: string = '';
  emailExistError: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  // Función para validar el nombre de usuario
  validateUsername() {
    if (this.user.user_name.length > 10) {
      this.usernameError = 'El nombre de usuario debe tener un máximo de 10 caracteres.';
    } else {
      this.usernameError = '';
    }
  }

  // Función para validar la contraseña
  validatePassword() {
    if (this.user.password.length < 6) {
      this.passwordError = 'La contraseña debe tener al menos 6 caracteres.';
    } else {
      this.passwordError = '';
    }
  }

  // Función para validar el nombre de usuario y el correo
  checkUsernameAndEmailAvailability() {
    this.authService.checkUsernameAvailability(this.user.user_name).subscribe(
      (response: any) => {
        if (response.exists) {
          this.userNameExistError = 'Este nombre de usuario ya está en uso.';
        } else {
          this.userNameExistError = '';
        }
      },
      (error) => {
        console.error('Error al comprobar nombre de usuario', error);
      }
    );

    this.authService.checkEmailAvailability(this.user.email).subscribe(
      (response: any) => {
        if (response.exists) {
          this.emailExistError = 'Este correo electrónico ya está en uso.';
        } else {
          this.emailExistError = '';
        }
      },
      (error) => {
        console.error('Error al comprobar correo electrónico', error);
      }
    );
  }

  // Función de registro
  onRegister() {
    console.log("Datos del usuario enviados: ", this.user);

    // Validamos antes de registrar
    this.validateUsername();
    this.validatePassword();
    this.checkUsernameAndEmailAvailability();  // Verificamos la disponibilidad del usuario y email

    // Si no hay errores, realizamos el registro
    if (!this.usernameError && !this.passwordError && !this.userNameExistError && !this.emailExistError) {
      this.authService.register(this.user).subscribe(
        (response) => {
          console.log('Usuario registrado con éxito', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error al registrar usuario', error);
        }
      );
    } else {
      console.error('No se puede registrar el usuario debido a errores de validación.');
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}

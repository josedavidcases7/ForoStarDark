import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';  

@Component({
  selector: 'app-register-election-pc',
  imports: [CommonModule],
  templateUrl: './register-election-pc.component.html',
  styleUrl: './register-election-pc.component.scss'
})
export class RegisterElectionPcComponent {
  loginImage: string = 'assets/images/logo.png';
  titleEmail: string = 'Email';
  username: string = 'Usuario';
  titlePassword: string = 'Contraseña';

  constructor(private router: Router) {} 


  navigateToLogin() {
    this.router.navigate(['/login']); 
  }
}

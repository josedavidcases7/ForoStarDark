import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';  

@Component({
  selector: 'app-login-election-pc',
  standalone: true,  
  imports: [CommonModule, RouterModule], 
  templateUrl: './login-election-pc.component.html',
  styleUrls: ['./login-election-pc.component.scss']
})
export class LoginElectionPcComponent {
  loginImage: string = 'assets/images/logo.png';
  username_email: string = 'Usuario o Email';
  titlePassword: string = 'Contraseña';

  constructor(private router: Router) {}  

  navigateToHome() {
    this.router.navigate(['/home']);  
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-pc',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './login-pc.component.html',
  styleUrls: ['./login-pc.component.scss'], 
})
export class LoginPcComponent {
  loginImage: string = 'assets/images/logo.png';

  constructor(private router: Router) {}

  navigateToRegister() {
    this.router.navigate(['/register']); 
  }
  navigateToLogin() {
    this.router.navigate(['/login']); 
  }
}

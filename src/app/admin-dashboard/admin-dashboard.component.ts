// admin-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';  // Asegúrate de importar el servicio AuthService
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
    imports: [FormsModule, HttpClientModule, CommonModule],
    providers: [AuthService],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Comprobamos si el usuario es admin al inicializar el componente
    this.isAdmin = this.authService.getIsAdmin();
  }
}

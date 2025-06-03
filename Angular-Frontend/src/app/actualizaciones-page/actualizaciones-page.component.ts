import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule

@Component({
  selector: 'app-actualizaciones-page',
  standalone: true,
  providers: [AuthService],
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './actualizaciones-page.component.html',
  styleUrls: ['./actualizaciones-page.component.scss']
})
export class ActualizacionesPageComponent implements OnInit {
  isAdmin: boolean = false;
  textoActualizacion: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdminUser();
    const guardado = localStorage.getItem('textoActualizacion');
    if (guardado) this.textoActualizacion = guardado;
  }

  guardar() {
    localStorage.setItem('textoActualizacion', this.textoActualizacion);
    alert('Actualización guardada correctamente.');
  }
}

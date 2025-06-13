import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActualizacionesPageComponent } from '../actualizaciones-page/actualizaciones-page.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizaciones',
  standalone: true,
  imports: [CommonModule,ActualizacionesPageComponent],
  templateUrl: './actualizaciones.component.html',
  styleUrls: ['./actualizaciones.component.scss']
})
export class ActualizacionesComponent {
  constructor(private router: Router) {}

  
  irAActualizaciones() {
    this.router.navigate(['/actualizaciones-page']);
  }
}

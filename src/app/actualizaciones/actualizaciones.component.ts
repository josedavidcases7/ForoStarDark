import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actualizaciones.component.html',
  styleUrls: ['./actualizaciones.component.scss']
})
export class ActualizacionesComponent {
  constructor(private router: Router) {}

  
  irAActualizaciones() {
    this.router.navigate(['/actualizaciones']);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true, // Colocado correctamente
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  contact: string = 'Contacto';
  correo: string = "✉️ Correo: dark-star@gmail.com"; // Cambia esto al número real
  copyright: string = 'Copyright © | Todos los derechos reservados a star-dark';
}

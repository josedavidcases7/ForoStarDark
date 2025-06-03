import { Component } from '@angular/core';

@Component({
  selector: 'app-fin-evento',
  imports: [],
  templateUrl: './fin-evento.component.html',
  styleUrl: './fin-evento.component.scss'
})
export class FinEventoComponent {

  titulo: string = 'FIN DEL DEBATE'; // Título principal
  mensaje: string = 'ENHORABUENA POR EL LOGRO EXCLUSIVO DE LA PARTICIPACIÓN DE ESTE DEBATE'; // Mensaje principal
  imagenRecompensa: string = '/assets/images/premio.png'; // Ruta de la imagen de la recompensa
  altRecompensa: string = 'Recompensa del debate'; // Texto alternativo para la imagen

}

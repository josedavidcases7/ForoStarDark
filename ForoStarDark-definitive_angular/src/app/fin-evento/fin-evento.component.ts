import { Component } from '@angular/core';

@Component({
  selector: 'app-fin-evento',
  imports: [],
  templateUrl: './fin-evento.component.html',
  styleUrl: './fin-evento.component.scss'
})
export class FinEventoComponent {

  titulo: string = 'FIN DEL DEBATE'; 
  mensaje: string = 'ENHORABUENA POR EL LOGRO EXCLUSIVO DE LA PARTICIPACIÓN DE ESTE DEBATE'; 
  imagenRecompensa: string = '/assets/images/premio.png'; 
  altRecompensa: string = 'Recompensa del debate';

}

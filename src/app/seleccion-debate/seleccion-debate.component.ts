import { Component } from '@angular/core';

@Component({
  selector: 'app-seleccion-debate',
  imports: [],
  templateUrl: './seleccion-debate.component.html',
  styleUrl: './seleccion-debate.component.scss'
})
export class SeleccionDebateComponent {

  titulo_debate : string = "¿LOS ALIENS EXISTEN?"

  opciones: { izquierda: string; derecha: string } = {
    izquierda: 'Sí',
    derecha: 'No',
  };
}

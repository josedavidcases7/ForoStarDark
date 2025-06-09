import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleccion-debate',
  templateUrl: './seleccion-debate.component.html',
  styleUrls: ['./seleccion-debate.component.scss']
})
export class SeleccionDebateComponent {
  titulo_debate: string = 'DEBATE';
  opciones: { izquierda: string; derecha: string } = {
    izquierda: '',
    derecha: ''
  };

  constructor(private router: Router) {
    
      const datos = localStorage.getItem('debateData');
      if (datos) {
        const datosDebate = JSON.parse(datos);
        this.titulo_debate = datosDebate.tema;
        this.opciones.izquierda = datosDebate.izquierda;
        this.opciones.derecha = datosDebate.derecha;
      }
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state;

    if (state) {
      this.titulo_debate = state['tema'] || 'DEBATE';
      this.opciones.izquierda = state['izquierda'] || 'Equipo 1';
      this.opciones.derecha = state['derecha'] || 'Equipo 2';
    }
  }
}

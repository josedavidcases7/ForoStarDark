import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-crear-evento',
  imports: [],
  templateUrl: './admin-crear-evento.component.html',
  styleUrl: './admin-crear-evento.component.scss'
})
export class AdminCrearEventoComponent {
    constructor(private router: Router) {}
  


  tituloPagina = 'CREAR EVENTO';
  temaDebate = 'TEMA DEBATE';
  nombresEquipos = 'NOMBRES DE EQUIPOS';
  primerEquipo = '1º EQUIPO';
  segundoEquipo = '2º EQUIPO';
  botonPublicar = 'PUBLICAR';
  botonCancelar = 'CANCELAR';

  cancelar() {
    // Limpiar los campos o datos que hayas agregado a la tabla
    this.temaDebate = '';
    this.primerEquipo = '';
    this.segundoEquipo = '';

    // Redirigir al Home
    this.router.navigate(['/']); // Te lleva a la página de inicio (Home)
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // 👈 AÑADE ESTO


@Component({
  selector: 'app-admin-crear-evento',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-crear-evento.component.html',
  styleUrl: './admin-crear-evento.component.scss'
})
export class AdminCrearEventoComponent {
    constructor(private router: Router) {}
  
    eventoPublicado: boolean = false;

ngOnInit(): void {
  this.eventoPublicado = !!localStorage.getItem('debateData');
}

    

  tituloPagina = 'CREAR EVENTO';
  temaDebate = 'TEMA DEBATE';
  nombresEquipos = 'NOMBRES DE EQUIPOS';
  primerEquipo = '1º EQUIPO';
  segundoEquipo = '2º EQUIPO';
  botonPublicar = 'PUBLICAR';
  botonCancelar = 'CANCELAR';
  tema: string = '';
  equipo1: string = '';
  equipo2: string = '';

  cancelar() {
    this.tema = '';
    this.equipo1 = '';
    this.equipo2 = '';
    this.router.navigate(['/home']);
  }
  publicar() {
    const datosDebate = {
      tema: this.tema,
      izquierda: this.equipo1,
      derecha: this.equipo2
    };
  
    localStorage.setItem('debateData', JSON.stringify(datosDebate));
    localStorage.setItem('mostrarDebate', 'true'); 

    this.router.navigate(['/seleccion-debate']);
  }
  







}

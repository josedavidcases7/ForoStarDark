import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit {
  @Input() comentarios: { texto: string, archivo: string | null, fotoUsuario: string }[] = [];
  comentariosMostrados: { texto: string, archivo: string | null, fotoUsuario: string, nombreUsuario: string }[] = []; // Añadido el campo nombreUsuario
  comentariosPorPagina = 10;  // Cantidad de comentarios por cada "página"
  paginaActual = 0;  // Empezamos en la página 0

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.mostrarComentarios();
  }

  // Función que muestra los comentarios de acuerdo a la página actual
  mostrarComentarios() {
    const inicio = this.paginaActual * this.comentariosPorPagina;
    const fin = inicio + this.comentariosPorPagina;
    // Se acumulan los comentarios ya mostrados y los nuevos
    this.comentariosMostrados = [...this.comentariosMostrados, ...this.comentarios.slice(inicio, fin).map(comentario => {
      const nombreUsuario = this.authService.getUsername() || '';  // Obtener el nombre de usuario desde AuthService
      return { ...comentario, nombreUsuario }; // Añadir nombreUsuario a cada comentario
    })];
  }

  // Función que se llama cuando el usuario hace clic en "Ver más"
  cargarMasComentarios() {
    this.paginaActual++;  // Aumenta la página actual
    this.mostrarComentarios();  // Muestra los comentarios correspondientes
  }

  // Función que verifica si quedan más comentarios por mostrar
  hayMasComentarios() {
    return this.paginaActual * this.comentariosPorPagina < this.comentarios.length;
  }
}

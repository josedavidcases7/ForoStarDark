import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent {
  @Input() comentarios: { texto: string, archivo: string | null, fotoUsuario: string }[] = [];
  comentariosMostrados: { texto: string, archivo: string | null, fotoUsuario: string }[] = [];
  comentariosPorPagina = 10;  // Cantidad de comentarios por cada "página"
  paginaActual = 0;  // Empezamos en la página 0

  ngOnInit() {
    this.mostrarComentarios();
  }

  // Función que muestra los comentarios de acuerdo a la página actual
  mostrarComentarios() {
    const inicio = this.paginaActual * this.comentariosPorPagina;
    const fin = inicio + this.comentariosPorPagina;
    // Se acumulan los comentarios ya mostrados y los nuevos
    this.comentariosMostrados = [...this.comentariosMostrados, ...this.comentarios.slice(inicio, fin)];
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

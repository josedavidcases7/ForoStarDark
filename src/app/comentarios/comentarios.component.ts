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
  @Input() comentarios: { texto: string, archivo: string | null, fotoUsuario: string, userName?: string }[] = [];
  comentariosMostrados: { texto: string, archivo: string | null, fotoUsuario: string, nombreUsuario: string }[] = [];
  comentariosPorPagina = 10;  // Cantidad de comentarios por cada "página"
  paginaActual = 0;  // Empezamos en la página 0

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.mostrarComentarios();
  }

  mostrarComentarios() {
    const inicio = this.paginaActual * this.comentariosPorPagina;
    const fin = inicio + this.comentariosPorPagina;
  
    // Verificar los comentarios que estamos mostrando
    console.log('Comentarios antes de mapear:', this.comentarios.slice(inicio, fin));
  
    this.comentariosMostrados = this.comentarios.slice(inicio, fin).map(comentario => {
      // Obtenemos el nombre de usuario y la foto de perfil del servicio
      const nombreUsuario = comentario.userName || this.authService.getUsername() || 'Usuario Anónimo';  // Si no tiene userName, lo mostramos como anónimo
      const fotoUsuario = comentario.fotoUsuario || this.authService.getAvatar() || '/assets/images/avatar1.png';  // Foto por defecto si no existe
  
      return { 
        ...comentario, 
        nombreUsuario, 
        fotoUsuario 
      };
    });
  
    // Verificar la estructura de los comentarios después de mapear
    console.log('Comentarios mostrados:', this.comentariosMostrados);
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

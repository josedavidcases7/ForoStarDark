import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RespuestaComponent } from '../respuesta/respuesta.component';
import { ComentariosComponent } from '../comentarios/comentarios.component';

interface Publicacion {
  titulo: string;
  descripcion: string;
  archivo: string | null;
  fileType: string | null;
  userName: string;
  likes: number;
  userProfileImage: string;
  id?: string; 
  mostrarFormularioRespuesta?: boolean;
  mostrarComentarios?: boolean;
  respuestas?: { texto: string, archivo: string | null, fotoUsuario: string }[];
}

@Component({
  selector: 'app-publicaciones',
  providers: [AuthService],
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RespuestaComponent, ComentariosComponent]
})
export class PublicacionesComponent implements OnInit {
  publicaciones: Publicacion[] = [];
  publicacionAEliminar: Publicacion | null = null;
  mostrarModal: boolean = false;
  usuarioActual: string | null = null;
  usuarioActualFoto: string | null = null;

  constructor(private authService: AuthService) {}
  isAdmin: boolean = false; // NUEVO

  ngOnInit() {
    this.usuarioActual = this.authService.getUsername();
    this.usuarioActualFoto = this.authService.getUserProfileImage(this.usuarioActual || '');
  
    const publicacionesGuardadas = localStorage.getItem('publicaciones');
    this.isAdmin = this.authService.getIsAdmin();

    if (publicacionesGuardadas) {
      this.publicaciones = JSON.parse(publicacionesGuardadas).map((publicacion: Publicacion) => {
        const userLikes = JSON.parse(localStorage.getItem(`likes_${this.usuarioActual}`) || '{}');
        const hasLiked = !!userLikes[publicacion.titulo];
        return {
          ...publicacion,
          userProfileImage: this.authService.getUserProfileImage(publicacion.userName) || '/assets/images/avatar1.png',
          mostrarFormularioRespuesta: false,
          mostrarComentarios: false,
          respuestas: publicacion.respuestas || [],
          likes: hasLiked ? publicacion.likes + 1 : publicacion.likes,
        };
      });
    } else {
      this.publicaciones = this.authService.getPublications().map((publicacion: Publicacion) => ({
        ...publicacion,
        userProfileImage: this.authService.getUserProfileImage(publicacion.userName) || '/assets/images/avatar1.png',
        mostrarFormularioRespuesta: false,
        mostrarComentarios: false,
        respuestas: []
      }));
    }
  }
  
  

  darLike(publicacion: Publicacion) {
    const username = this.authService.getUsername();
    if (!username) {
      alert('Debes iniciar sesión para dar like.');
      return;
    }
  
    let publicaciones = JSON.parse(localStorage.getItem('publicaciones') || '[]');
    let userLikes = JSON.parse(localStorage.getItem(`likes_${username}`) || '{}');
  
    const likedBefore = userLikes[publicacion.titulo];
  
    if (likedBefore) {
      publicacion.likes -= 1;
      delete userLikes[publicacion.titulo]; 
    } else {
      publicacion.likes += 1;
      userLikes[publicacion.titulo] = true; 
    }
  
    localStorage.setItem(`likes_${username}`, JSON.stringify(userLikes));
  
    publicaciones = publicaciones.map((p: Publicacion) =>
      p.titulo === publicacion.titulo ? { ...p, likes: publicacion.likes } : p
    );
  
    localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
  }
  
  

  userHasLiked(publicacion: Publicacion): boolean {
    const username = this.authService.getUsername();
    if (!username) return false;
  
    const userLikes = JSON.parse(localStorage.getItem(`likes_${username}`) || '{}');
  
    return !!userLikes[publicacion.titulo];
  }
  

  esPropietario(publicacion: Publicacion): boolean {
    return publicacion.userName === this.usuarioActual;
  }

  confirmDelete(publicacion: Publicacion) {
    this.publicacionAEliminar = publicacion;
    this.mostrarModal = true;
  }

  deletePublication() {
    if (this.publicacionAEliminar) {
      let publicaciones = this.authService.getPublications();

      publicaciones = publicaciones.filter((p: Publicacion) =>
        p.id ? p.id !== this.publicacionAEliminar!.id : p.titulo !== this.publicacionAEliminar!.titulo
      );

      localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
      this.publicaciones = [...publicaciones];
      this.mostrarModal = false;
      this.publicacionAEliminar = null;
    }
  }

  cancelarEliminacion() {
    this.mostrarModal = false;
    this.publicacionAEliminar = null;
  }

  toggleRespuesta(publicacion: Publicacion) {
    publicacion.mostrarFormularioRespuesta = !publicacion.mostrarFormularioRespuesta;
  }

  toggleComentarios(publicacion: Publicacion) {
    publicacion.mostrarComentarios = !publicacion.mostrarComentarios;
  }

  guardarRespuesta(publicacion: Publicacion, respuesta: { texto: string, archivo: string | null }) {
    publicacion.respuestas?.push({
      texto: respuesta.texto,
      archivo: respuesta.archivo,
      fotoUsuario: this.usuarioActualFoto || '/assets/images/avatar1.png'
    });

    publicacion.mostrarFormularioRespuesta = false;

    this.actualizarPublicacionesEnLocalStorage();
  }

  cancelarRespuesta(publicacion: Publicacion) {
    publicacion.mostrarFormularioRespuesta = false;
  }

  actualizarPublicacionesEnLocalStorage() {
    localStorage.setItem('publicaciones', JSON.stringify(this.publicaciones));
  }
}

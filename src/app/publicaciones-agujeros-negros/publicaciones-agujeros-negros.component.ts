import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RespuestaComponent } from '../respuesta/respuesta.component';
import { ComentariosComponent } from '../comentarios/comentarios.component';
import { map } from 'rxjs/operators';

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
  selector: 'app-publicaciones-agujeros-negros',
  providers: [AuthService],
  imports: [CommonModule, FormsModule, HttpClientModule, RespuestaComponent, ComentariosComponent],
  standalone: true,
  templateUrl: './publicaciones-agujeros-negros.component.html',
  styleUrl: './publicaciones-agujeros-negros.component.scss',
})
export class PublicacionesAgujerosNegrosComponent implements OnInit {
  publicaciones: Publicacion[] = [];
  publicacionAEliminar: Publicacion | null = null;
  mostrarModal: boolean = false;
  usuarioActual: string | null = null;
  usuarioActualFoto: string | null = null;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {}

   ngOnInit() {
    this.usuarioActual = this.authService.getUsername();
    this.usuarioActualFoto = this.authService.getUserProfileImage(this.usuarioActual || '');
    this.isAdmin = this.authService.getIsAdmin();

    // Usamos pipe y subscribe para obtener los datos desde el backend
    this.authService.getPublications().pipe(
      map((publicaciones: any[]) =>
        publicaciones.map(publicacion => ({
          titulo: publicacion.title || '',
          descripcion: publicacion.description || '',
          archivo: publicacion.image || null,
          fileType: publicacion.fileType || null,
          userName: publicacion.user_name || 'Anónimo',
          userProfileImage: this.authService.getUserProfileImage(publicacion.userName) || '/assets/images/avatar1.png',
          likes: publicacion.likes || 0,
          id: publicacion.id,
          mostrarFormularioRespuesta: false,
          mostrarComentarios: false,
          respuestas: publicacion.respuestas || []
        }))
      )
    ).subscribe(publicacionesTransformadas => {
      this.publicaciones = publicacionesTransformadas;
    });
  }

  darLike(publicacion: Publicacion) {
    const username = this.authService.getUsername();
    if (!username) {
      alert('Debes iniciar sesión para dar like.');
      return;
    }

    // Aquí deberías llamar al backend para actualizar el like
    // Por ahora actualizamos localmente para reflejar el cambio

    publicacion.likes += 1;

    // Ideal: llamar a un método del servicio para actualizar en la DB
    // this.authService.likePublication(publicacion.id).subscribe(...);
  }

  userHasLiked(publicacion: Publicacion): boolean {
    // Aquí necesitarías consultar al backend para saber si el usuario dio like,
    // pero mientras devuelve false para evitar lógica localStorage
    return false;
  }

  esPropietario(publicacion: Publicacion): boolean {
    return publicacion.userName === this.usuarioActual;
  }

  confirmDelete(publicacion: Publicacion) {
    this.publicacionAEliminar = publicacion;
    this.mostrarModal = true;
  }

  deletePublication() {
    if (!this.publicacionAEliminar) return;

    // Aquí deberías llamar a tu servicio para eliminar la publicación en la base de datos
    // Luego actualizar el listado localmente con la respuesta del backend
    // Por ahora sólo eliminamos localmente

    this.publicaciones = this.publicaciones.filter(p => p.id !== this.publicacionAEliminar?.id);
    this.mostrarModal = false;
    this.publicacionAEliminar = null;
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
    if (!publicacion.respuestas) publicacion.respuestas = [];

    publicacion.respuestas.push({
      texto: respuesta.texto,
      archivo: respuesta.archivo,
      fotoUsuario: this.usuarioActualFoto || '/assets/images/avatar1.png',
    });

    publicacion.mostrarFormularioRespuesta = false;

    // Aquí deberías llamar al backend para guardar la respuesta
    // this.authService.saveRespuesta(publicacion.id, respuesta).subscribe(...)
  }

  cancelarRespuesta(publicacion: Publicacion) {
    publicacion.mostrarFormularioRespuesta = false;
  }
}

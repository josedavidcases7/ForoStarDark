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
  selector: 'app-publicaciones-galaxias',
  providers: [AuthService],
  imports: [CommonModule, FormsModule, HttpClientModule, RespuestaComponent, ComentariosComponent],
  standalone: true,
  templateUrl: './publicaciones-galaxias.component.html',
  styleUrl: './publicaciones-galaxias.component.scss'
})
export class PublicacionesGalaxiasComponent implements OnInit {
  publicaciones: Publicacion[] = [];
  publicacionAEliminar: Publicacion | null = null;
  mostrarModal: boolean = false;
  usuarioActual: string | null = null;
  usuarioActualFoto: string | null = null;
  isAdmin: boolean = false;
  mostrarFormularioReporte = false;
  publicacionAReportar: Publicacion | null = null;
  motivoReporte: string = '';

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

  abrirReporte(publicacion: Publicacion) {
    this.publicacionAReportar = publicacion;
    this.motivoReporte = '';
    this.mostrarFormularioReporte = true;
  }

  cancelarReporte() {
    this.publicacionAReportar = null;
    this.mostrarFormularioReporte = false;
  }

  enviarReporte() {
    if (!this.publicacionAReportar || !this.motivoReporte.trim()) return;

    const reportes = JSON.parse(localStorage.getItem('reportes') || '[]');
    reportes.push({
      reportadoPor: this.usuarioActual,
      autorPublicacion: this.publicacionAReportar.userName,
      tituloPublicacion: this.publicacionAReportar.titulo,
      motivo: this.motivoReporte
    });

    localStorage.setItem('reportes', JSON.stringify(reportes));

    this.publicacionAReportar = null;
    this.mostrarFormularioReporte = false;
    localStorage.setItem('nuevosReportes', 'true');
  }

  darLike(publicacion: Publicacion) {
    const username = this.authService.getUsername();
    if (!username) {
      alert('Debes iniciar sesión para dar like.');
      return;
    }

    // Aquí deberías implementar el llamado al backend para registrar el like
    // Por ahora solo actualizamos el contador localmente para reflejar el cambio
    publicacion.likes += 1;

    // Ejemplo:
    // this.authService.likePublication(publicacion.id).subscribe(...)
  }

  userHasLiked(publicacion: Publicacion): boolean {
    // Implementar lógica con backend para verificar si usuario dio like.
    return false; // Por defecto false para no depender de localStorage
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

    // Aquí deberías llamar al backend para eliminar la publicación y luego actualizar el array
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

    // Aquí debes implementar la llamada al backend para guardar la respuesta
  }

  cancelarRespuesta(publicacion: Publicacion) {
    publicacion.mostrarFormularioRespuesta = false;
  }
}

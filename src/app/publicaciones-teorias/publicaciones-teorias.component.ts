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
  selector: 'app-publicaciones-teorias',
  providers: [AuthService],
  imports: [CommonModule, FormsModule, HttpClientModule, RespuestaComponent, ComentariosComponent],
  standalone: true,
  templateUrl: './publicaciones-teorias.component.html',
  styleUrl: './publicaciones-teorias.component.scss'
})
export class PublicacionesTeoriasComponent implements OnInit {
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
          titulo: publicacion.titulo || '',
          descripcion: publicacion.descripcion || '',
          archivo: publicacion.archivo || null,
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
  if (!this.usuarioActual) {
    alert('Debes iniciar sesión para dar like.');
    return;
  }

  this.authService.likePublication(publicacion.id!, this.usuarioActual).subscribe(() => {
    publicacion.likes += 1;
  }, error => {
    console.error('Error al dar like:', error);
  });
}


  userHasLiked(publicacion: Publicacion): boolean {
    // Aquí puedes implementar la lógica para verificar si el usuario ha dado like,
    // ya sea consultando al backend o manteniendo un estado local.
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
    if (!this.publicacionAEliminar || !this.publicacionAEliminar.id) return;

    this.authService.deletePublication(this.publicacionAEliminar.id).subscribe(() => {
      this.publicaciones = this.publicaciones.filter(p => p.id !== this.publicacionAEliminar?.id);
      this.mostrarModal = false;
      this.publicacionAEliminar = null;
    });
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

    const nuevaRespuesta = {
      texto: respuesta.texto,
      archivo: respuesta.archivo,
      fotoUsuario: this.usuarioActualFoto || '/assets/images/avatar1.png',
    };

    if (!publicacion.id) return;

    this.authService.addRespuesta(publicacion.id, nuevaRespuesta).subscribe(() => {
      publicacion.respuestas!.push(nuevaRespuesta);
      publicacion.mostrarFormularioRespuesta = false;
    });
  }

  cancelarRespuesta(publicacion: Publicacion) {
    publicacion.mostrarFormularioRespuesta = false;
  }
}

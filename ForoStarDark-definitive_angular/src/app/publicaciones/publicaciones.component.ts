import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RespuestaComponent } from '../respuesta/respuesta.component';
import { ComentariosComponent } from '../comentarios/comentarios.component';
import { map } from 'rxjs/operators';
import { RouterModule } from '@angular/router'; // NECESARIO para usar [routerLink]

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
   userHasLiked?: boolean;
}

@Component({
  selector: 'app-publicaciones',
  providers: [AuthService],
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RespuestaComponent, ComentariosComponent, RouterModule]
})
export class PublicacionesComponent implements OnInit {
  publicaciones: Publicacion[] = [];
   isLoading = true;
  publicacionAEliminar: Publicacion | null = null;
  mostrarModal: boolean = false;
  usuarioActual: string | null = null;
  usuarioActualFoto: string | null = null;

  mostrarFormularioReporte = false;
  publicacionAReportar: Publicacion | null = null;
  motivoReporte: string = '';
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
     this.usuarioActual = this.authService.getUsername();
     this.usuarioActualFoto = this.authService.getUserProfileImage(this.usuarioActual || '');
     this.isAdmin = this.authService.getIsAdmin();
 
     this.authService.getPublications().pipe(
       map((publicaciones: any[]) =>
         publicaciones.map(publicacion => ({
           titulo: publicacion.title || '',
           descripcion: publicacion.description || '',
           archivo: publicacion.image || null,
           fileType: publicacion.fileType || null,
           userName: publicacion.user_name || 'Anónimo',
           userProfileImage: this.authService.getUserProfileImage(publicacion.user_name) || '/assets/images/avatar1.png',
           likes: publicacion.likes || 0,
           id: publicacion.id,
           mostrarFormularioRespuesta: false,
           mostrarComentarios: false,
           respuestas: publicacion.respuestas || [],
           userHasLiked: publicacion.userHasLiked || false
         }))
       )
     ).subscribe(publicacionesTransformadas => {
       this.publicaciones = publicacionesTransformadas;
       this.isLoading = false;
       }, error => {
      console.error(error);
      this.isLoading = false;
     });
   }

   

darLike(publicacion: Publicacion) {
  if (!this.usuarioActual) {
    alert('Debes iniciar sesión para dar like.');
    return;
  }

  this.authService.likePublication(publicacion.id!, this.usuarioActual).subscribe(() => {
    if (publicacion.userHasLiked) {
      publicacion.likes -= 1;
    } else {
      publicacion.likes += 1;
    }
    publicacion.userHasLiked = ! publicacion.userHasLiked;
  }, error => {
    console.error('Error al dar like:', error);
  });
}




  userHasLiked(publicacion: Publicacion): boolean {
    return publicacion.userHasLiked || false;
  }

  esPropietario(publicacion: Publicacion): boolean {
    return publicacion.userName === this.usuarioActual;
  }

  confirmDelete(publicacion: Publicacion) {
    this.publicacionAEliminar = publicacion;
    this.mostrarModal = true;
  }

  deletePublication() {
    if (this.publicacionAEliminar && this.publicacionAEliminar.id) {
      this.authService.deletePublication(this.publicacionAEliminar.id).subscribe(() => {
        this.publicaciones = this.publicaciones.filter(p => p.id !== this.publicacionAEliminar!.id);
        this.mostrarModal = false;
        this.publicacionAEliminar = null;
      }, error => {
        console.error('Error eliminando publicación:', error);
      });
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
  }

  cancelarRespuesta(publicacion: Publicacion) {
    publicacion.mostrarFormularioRespuesta = false;
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

guardarPublicacion(publicacion: any) {
  console.log('Guardando publicación:', publicacion);
  this.authService.savePublication(publicacion).subscribe({
    next: (response) => {
      console.log('Respuesta backend:', response);
      alert(response.message || '¡Publicación guardada correctamente!');
      this.cargarPublicaciones();
    },
    error: (err) => {
      console.error('Error al guardar publicación:', err);
      alert('Error al guardar publicación');
    }
  });
}


cargarPublicaciones() {
  this.authService.getPublications().subscribe(data => {
    this.publicaciones = data;
  });
}

}

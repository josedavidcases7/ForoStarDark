import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-subir-publicacion',
  providers: [AuthService],
  templateUrl: './subir-publicacion.component.html',
  styleUrls: ['./subir-publicacion.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class SubirPublicacionComponent {
  tituloTexto: string = '';  // Título de la publicación
  descripcionTexto: string = '';  // Descripción de la publicación
  documento: string = 'DOCUMENTO';  // Variable documento para el template
  filePreview: string | null = null;  // Vista previa del archivo
  fileType: string | null = null;  // Tipo de archivo (imagen, video, etc.)
  selectedSection: string = 'publicaciones'; // Sección predeterminada para guardar (home)
publicaciones: any[] = [];

  constructor(private authService: AuthService) {}

  // Maneja la selección del archivo y crea una vista previa
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileType = file.type.split('/')[0];  // Determinamos el tipo de archivo (imagen, video, etc.)
      
      // Si es una imagen o video, creamos la vista previa
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.filePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Subir archivo al seleccionar
  uploadFile() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput?.click();  // Simula un clic en el input para abrir el selector de archivos
  }
postPublication() {
  if (!this.tituloTexto.trim() || !this.descripcionTexto.trim()) {
    alert('Por favor, completa el título y la descripción antes de publicar.');
    return;
  }

  const userProfile = this.authService.getUserProfile();
  const username = userProfile ? userProfile.username : 'Usuario';
  const avatar = this.authService.getAvatar() || '';

const nuevaPublicacion = {
  title: this.tituloTexto,
  description: this.descripcionTexto,
  image: this.filePreview,
  user_name: this.authService.getUsername() || 'usuario_default',
  user_profile_image: this.authService.getAvatar() || '',
  likes: 0
};



  console.log('Datos de la nueva publicación:', nuevaPublicacion);

  this.authService.savePublication(nuevaPublicacion).subscribe({
    next: () => {
      alert('Publicación realizada con éxito.');
      this.tituloTexto = '';
      this.descripcionTexto = '';
      this.filePreview = null;
      this.fileType = null;
      (document.querySelector('input[type="file"]') as HTMLInputElement).value = '';
      this.cargarPublicaciones();
    },
    error: (err) => {
      console.error('Error al guardar publicación:', err);
      alert('Error al guardar publicación.');
    }
  });
}

cargarPublicaciones() {
  this.authService.getPublications().subscribe(data => {
    this.publicaciones = data;
  });
}

}

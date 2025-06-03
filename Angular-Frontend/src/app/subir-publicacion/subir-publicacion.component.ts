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

  // Función para manejar la publicación
  postPublication() {
    const userProfile = this.authService.getUserProfile();
    const username = userProfile ? userProfile.username : 'Usuario';
    const avatar = this.authService.getAvatar() || '';  // Asegúrate de obtener el avatar
  
    // Crear la publicación con los datos introducidos por el usuario
    const nuevaPublicacion = {
      titulo: this.tituloTexto,
      descripcion: this.descripcionTexto,
      archivo: this.filePreview, // Aquí guardamos la imagen/video que el usuario ha subido
      fileType: this.fileType,
      username: username,
      avatar: avatar,  // Asegúrate de pasar el avatar aquí
      likes: 0, // Inicializa con 0 likes
      userProfileImage: avatar // Guardamos la imagen del perfil
    };

    // Guardar la publicación en la sección correspondiente (publicaciones o planetas_estrellas)
    this.authService.savePublication(nuevaPublicacion, this.selectedSection);

    // Limpiar formulario después de postear
    this.tituloTexto = '';
    this.descripcionTexto = '';
    this.filePreview = null;
    this.fileType = null;
  }
}

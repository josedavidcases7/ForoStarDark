import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-subir-publicacion-satelites',
  imports: [CommonModule,HttpClientModule, FormsModule],
  providers: [AuthService],
  templateUrl: './subir-publicacion-satelites.component.html',
  styleUrls: ['./subir-publicacion-satelites.component.scss']
})
export class SubirPublicacionSatelitesComponent {
  tituloSeccion: string = 'SATELITES'; // Sección visible, no se modifica
  tituloTexto: string = ''; // Campo editable por el usuario
  descripcionTexto: string = ''; // Campo editable por el usuario
  documento: string = 'DOCUMENTO';
  
  filePreview: string | null = null;
  fileType: string | null = null;

  constructor(private authService: AuthService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileType = file.type.split('/')[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.filePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadFile() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput?.click();
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
      titulo: this.tituloTexto, // Ahora guarda lo que el usuario escribió
      descripcion: this.descripcionTexto, // Ahora guarda lo que el usuario escribió
      archivo: this.filePreview,
      fileType: this.fileType,
      username: username,
      avatar: avatar,
      likes: 0,
      userProfileImage: avatar
    };

    // Guardar en localStorage en la sección correcta
    this.authService.savePublication(nuevaPublicacion, 'publicaciones_satelites');

    // Limpiar el formulario después de postear
    this.tituloTexto = '';
    this.descripcionTexto = '';
    this.filePreview = null;
    this.fileType = null;
  }

  cargarPublicaciones() {
    const publicaciones = JSON.parse(localStorage.getItem('publicaciones_satelites') || '[]');
    console.log('Publicaciones cargadas:', publicaciones);
    return publicaciones;
  }
}

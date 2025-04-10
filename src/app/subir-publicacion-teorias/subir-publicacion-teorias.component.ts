import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subir-publicacion-teorias',
  providers: [AuthService],
  templateUrl: './subir-publicacion-teorias.component.html',
  styleUrls: ['./subir-publicacion-teorias.component.scss'],
  imports: [CommonModule, HttpClientModule, FormsModule]
})
export class SubirPublicacionTeoriasComponent {
  tituloSeccion: string = 'TEORÍAS'; 
  tituloTexto: string = ''; 
  descripcionTexto: string = ''; 
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
      titulo: this.tituloTexto,
      descripcion: this.descripcionTexto,
      archivo: this.filePreview,
      fileType: this.fileType,
      username: username,
      avatar: avatar,
      likes: 0,
      userProfileImage: avatar
    };

    this.authService.savePublication(nuevaPublicacion, 'publicaciones_teorias');

    this.tituloTexto = '';
    this.descripcionTexto = '';
    this.filePreview = null;
    this.fileType = null;
    (document.querySelector('input[type="file"]') as HTMLInputElement).value = '';

    alert('Publicación realizada con éxito.');
  }

  cargarPublicaciones() {
    const publicaciones = JSON.parse(localStorage.getItem('publicaciones_teorias') || '[]');
    console.log('Publicaciones cargadas:', publicaciones);
    return publicaciones;
  }
}

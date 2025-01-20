import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subir-publicacion',
  templateUrl: './subir-publicacion.component.html',
  styleUrls: ['./subir-publicacion.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SubirPublicacionComponent {
  tituloTexto: string = 'TITULO';
  documento: string = 'DOCUMENTO';
  descripcionTexto: string = 'DESCRIPCION';
  
  filePreview: string | null = null; // Variable para almacenar la vista previa del archivo
  fileType: string | null = null; // Tipo de archivo (imagen, video, etc.)

  // Maneja la selección del archivo y crea una vista previa
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileType = file.type.split('/')[0]; // Determinamos el tipo de archivo (imagen, video, etc.)
      
      // Si es una imagen o video, creamos la vista previa
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.filePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadFile() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput?.click();  // Simula un clic en el input para abrir el selector de archivos
  }
}

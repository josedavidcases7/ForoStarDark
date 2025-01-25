import { Component } from '@angular/core';

@Component({
  selector: 'app-subir-publicacion-agujeros-negros',
  imports: [],
  templateUrl: './subir-publicacion-agujeros-negros.component.html',
  styleUrl: './subir-publicacion-agujeros-negros.component.scss'
})
export class SubirPublicacionAgujerosNegrosComponent {
  tituloTexto: string = 'AGUJEROS NEGROS'; // Título específico para la sección
  documento: string = 'DOCUMENTO';
  descripcionTexto: string = 'DESCRIPCION';
  
  filePreview: string | null = null;
  fileType: string | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileType = file.type.split('/')[0]; // Tipo de archivo (imagen, video, etc.)
      
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

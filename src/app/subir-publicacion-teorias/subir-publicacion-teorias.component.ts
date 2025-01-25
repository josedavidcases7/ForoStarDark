import { Component } from '@angular/core';

@Component({
  selector: 'app-subir-publicacion-teorias',
  templateUrl: './subir-publicacion-teorias.component.html',
  styleUrls: ['./subir-publicacion-teorias.component.scss']
})
export class SubirPublicacionTeoriasComponent {
  tituloTexto: string = 'TEORIAS';
  documento: string = 'DOCUMENTO';
  descripcionTexto: string = 'DESCRIPCION';
  
  filePreview: string | null = null;
  fileType: string | null = null;

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
}

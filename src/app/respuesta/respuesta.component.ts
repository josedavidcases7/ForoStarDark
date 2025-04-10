import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-respuesta',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './respuesta.component.html',
  styleUrls: ['./respuesta.component.scss']
})
export class RespuestaComponent {
  @Input() usuarioActualFoto: string | null = null; // Foto del usuario actual
  @Output() respuestaEnviada = new EventEmitter<{ texto: string, archivo: string | null }>();
  @Output() cancelar = new EventEmitter<void>();

  textoRespuesta: string = "";
  archivoAdjunto: string | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.archivoAdjunto = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  enviar() {
    if (!this.textoRespuesta.trim()) {
      alert("Escribe una respuesta antes de enviar.");
      return;
    }

    this.respuestaEnviada.emit({ texto: this.textoRespuesta, archivo: this.archivoAdjunto });
    this.textoRespuesta = "";
    this.archivoAdjunto = null;
  }

  cancelarRespuesta() {
    this.textoRespuesta = "";
    this.archivoAdjunto = null;
    this.cancelar.emit();
  }
}

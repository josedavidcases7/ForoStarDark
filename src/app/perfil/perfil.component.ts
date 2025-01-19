import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component'; // Importar HeaderComponent
import { FormsModule } from '@angular/forms'; // Importar FormsModule para usar ngModel
import { FooterComponent } from '../footer/footer.component'; // Importar HeaderComponent

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule, FooterComponent] // Asegúrate de importar FormsModule
})
export class ProfileComponent {
  uploadedImage: string | null = null; // Imagen para el rectángulo
  uploadedCircleImage: string | null = null; // Imagen para el círculo
  username: string = ''; // Nombre de usuario
  maxLength: number = 185;  // Número máximo de caracteres por línea

  lines: { text: string }[] = [
    { text: '' },
    { text: '' },
    { text: '' }
  ]; // Array de líneas de texto

  // Función para cambiar la imagen del rectángulo
  changeImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.uploadedImage = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    };

    input.click(); // Simula el click en el input de tipo file
  }

  // Función para cambiar la imagen del círculo
  changeCircleImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.uploadedCircleImage = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    };

    input.click(); // Simula el click en el input de tipo file
  }

  // Función que maneja el flujo entre las líneas
  moveFocus(index: number): void {
    const currentInput = document.getElementById(`input-${index}`) as HTMLTextAreaElement;
    
    // Si el campo actual está lleno, mueve el foco al siguiente campo
    if (currentInput && currentInput.value.length >= this.maxLength) {
      const nextInput = document.getElementById(`input-${index + 1}`) as HTMLTextAreaElement;
      if (nextInput) {
        nextInput.focus();
      }
    }

    // Si se borra texto, se mueve al campo anterior
    if (currentInput && currentInput.value.length === 0 && index > 0) {
      const prevInput = document.getElementById(`input-${index - 1}`) as HTMLTextAreaElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
  }

  logrosTexto: string = "Logros";

  
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  providers: [AuthService],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class ProfileComponent implements OnInit {
  uploadedImage: string | null = null; // Imagen para el rectángulo
  uploadedCircleImage: string | null = null; // Imagen para el círculo
  username: string = ''; // Nombre de usuario
  maxLength: number = 185;
  lines: { text: string }[] = [{ text: '' }, { text: '' }, { text: '' }];
  logrosTexto: string = "Logros";

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const username = localStorage.getItem('username'); // Obtener el usuario actual
    if (username) {
      this.username = username;

      // Cargar datos específicos de este usuario
      const userData = localStorage.getItem(`profile_${username}`);
      if (userData) {
        const profile = JSON.parse(userData);
        this.uploadedImage = profile.uploadedImage;
        this.uploadedCircleImage = profile.uploadedCircleImage;
        this.lines = profile.lines || [{ text: '' }, { text: '' }, { text: '' }];
        this.logrosTexto = profile.logrosTexto || "Logros";
      }
    }
  }

  saveUserProfile(): void {
    const profileData = {
      uploadedImage: this.uploadedImage,
      uploadedCircleImage: this.uploadedCircleImage,
      lines: this.lines,
      logrosTexto: this.logrosTexto,
    };

    try {
      localStorage.setItem(`profile_${this.username}`, JSON.stringify(profileData));
    } catch (error) {
      if (error instanceof DOMException && error.code === 22) {
        alert('Se ha superado el límite de almacenamiento local. Por favor, elimine algunos datos antiguos.');
      }
    }
  }

  // Optimización de la imagen antes de guardarla
  optimizeImage(file: File, callback: (resizedImage: string) => void): void {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const maxWidth = 800; // Ancho máximo de la imagen
      const maxHeight = 600; // Alto máximo de la imagen

      let width = img.width;
      let height = img.height;

      // Redimensionar la imagen si excede las dimensiones máximas
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = width * ratio;
        height = height * ratio;
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
      } else {
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
      }

      const resizedImage = canvas.toDataURL('image/jpeg', 0.8); // Usamos calidad 80% para reducir tamaño

      // Verificar el tamaño de la imagen
      const maxSize = 500000; // 500KB máximo
      const imageSize = (resizedImage.length * (3 / 4)); // Convertimos a bytes

      if (imageSize > maxSize) {
        alert('La imagen es demasiado grande. Por favor, elige una imagen más pequeña.');
      } else {
        callback(resizedImage); // Llamamos al callback con la imagen optimizada
      }
    };

    reader.readAsDataURL(file);
  }

  changeImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        this.optimizeImage(file, (resizedImage) => {
          this.uploadedImage = resizedImage;
          this.saveUserProfile(); // Guardar cambios
        });
      }
    };

    input.click();
  }

  changeCircleImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        this.optimizeImage(file, (resizedImage) => {
          this.uploadedCircleImage = resizedImage;
          this.saveUserProfile(); // Guardar cambios
        });
      }
    };

    input.click();
  }

  moveFocus(index: number): void {
    const currentInput = document.getElementById(`input-${index}`) as HTMLTextAreaElement;

    if (currentInput && currentInput.value.length >= this.maxLength) {
      const nextInput = document.getElementById(`input-${index + 1}`) as HTMLTextAreaElement;
      if (nextInput) {
        nextInput.focus();
      }
    }

    if (currentInput && currentInput.value.length === 0 && index > 0) {
      const prevInput = document.getElementById(`input-${index - 1}`) as HTMLTextAreaElement;
      if (prevInput) {
        prevInput.focus();
      }
    }

    this.saveUserProfile(); // Guardar cambios cada vez que se editen las líneas
  }
}

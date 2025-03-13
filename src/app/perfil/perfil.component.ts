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
    localStorage.setItem(`profile_${this.username}`, JSON.stringify(profileData));
  }

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
          this.saveUserProfile(); // Guardar cambios
        };
        reader.readAsDataURL(file);
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
        const reader = new FileReader();
        reader.onload = (e) => {
          this.uploadedCircleImage = e.target?.result as string;
          this.saveUserProfile(); // Guardar cambios
        };
        reader.readAsDataURL(file);
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

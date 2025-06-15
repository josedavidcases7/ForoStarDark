import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  providers: [AuthService],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule]
})
export class ProfileComponent implements OnInit {
  uploadedImage: string | null = null;
  uploadedCircleImage: string | null = null;
  username: string = '';
  maxLength: number = 185;
  lines: { text: string }[] = [{ text: '' }, { text: '' }, { text: '' }];
  logrosTexto: string = "Logros";
  logros: number = 0;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

ngOnInit(): void {
  const storedUsername = localStorage.getItem('username');

  this.route.paramMap.subscribe(params => {
    const usernameParam = params.get('username');
    this.username = usernameParam || storedUsername || '';

    if (this.username) {
      this.loadUserProfile();
    }
  });
}

  fetchUserProfileFromAPI(username: string): void {
    this.http.get<any>(`https://tudominio/api/perfil/${username}`).subscribe({
      next: (profile) => {
        this.uploadedImage = profile.uploadedImage;
        this.uploadedCircleImage = profile.uploadedCircleImage;
        this.lines = profile.lines || [{ text: '' }, { text: '' }, { text: '' }];
        this.logrosTexto = profile.logrosTexto || "Logros";
        this.logros = profile.logros || 0;
      },
      error: () => {
        console.error('No se pudo cargar el perfil desde el servidor');
      }
    });
  }

  loadUserProfile(): void {
    const userData = localStorage.getItem(`profile_${this.username}`);
    if (userData) {
      const profile = JSON.parse(userData);
      this.uploadedImage = profile.uploadedImage;
      this.uploadedCircleImage = profile.uploadedCircleImage;
      this.lines = profile.lines || [{ text: '' }, { text: '' }, { text: '' }];
      this.logrosTexto = profile.logrosTexto || "Logros";
      this.logros = profile.logros || 0;

      const puntos = profile.puntuacion || 0;
      this.updateLogros(puntos);
    }
  }

  updateLogros(puntos: number): void {
    this.logros = Math.floor(puntos / 50);
    this.saveUserProfile();
  }

  saveUserProfile(): void {
    const profileData = {
      uploadedImage: this.uploadedImage,
      uploadedCircleImage: this.uploadedCircleImage,
      lines: this.lines,
      logrosTexto: this.logrosTexto,
      logros: this.logros,
      puntuacion: Math.floor(this.logros * 50),
    };

    try {
      localStorage.setItem(`profile_${this.username}`, JSON.stringify(profileData));
    } catch (error) {
      if (error instanceof DOMException && error.code === 22) {
        alert('Se ha superado el límite de almacenamiento local. Por favor, elimine algunos datos antiguos.');
      }
    }
  }

  optimizeImage(file: File, callback: (resizedImage: string) => void): void {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const maxWidth = 800;
      const maxHeight = 600;

      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);

      const resizedImage = canvas.toDataURL('image/jpeg', 0.8);
      const maxSize = 500000;
      const imageSize = resizedImage.length * (3 / 4);

      if (imageSize > maxSize) {
        alert('La imagen es demasiado grande. Por favor, elige una imagen más pequeña.');
      } else {
        callback(resizedImage);
      }
    };

    reader.readAsDataURL(file);
  }

  changeImage(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        this.optimizeImage(file, (resizedImage) => {
          this.uploadedImage = resizedImage;
          this.saveUserProfile();
        });
      }
    };

    input.click();
  }

  changeCircleImage(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        this.optimizeImage(file, (resizedImage) => {
          this.uploadedCircleImage = resizedImage;
          this.saveUserProfile();
        });
      }
    };

    input.click();
  }

  moveFocus(index: number): void {
    const currentInput = document.getElementById(`input-${index}`) as HTMLTextAreaElement;

    if (currentInput && currentInput.value.length >= this.maxLength) {
      const nextInput = document.getElementById(`input-${index + 1}`) as HTMLTextAreaElement;
      if (nextInput) nextInput.focus();
    }

    if (currentInput && currentInput.value.length === 0 && index > 0) {
      const prevInput = document.getElementById(`input-${index - 1}`) as HTMLTextAreaElement;
      if (prevInput) prevInput.focus();
    }

    this.saveUserProfile();
  }
}

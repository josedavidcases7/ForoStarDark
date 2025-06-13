import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AchievementsService } from '../services/achievements.service';
import { GenericoService } from '../services/generico.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-perfil',
  providers: [AuthService, AchievementsService, GenericoService, UsersService],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
})
export class ProfileComponent implements OnInit {
  uploadedImage: string | null = null;
  uploadedCircleImage: string | null = null;
  username: string = '';
  maxLength: number = 185;
  lines: { text: string }[] = [{ text: '' }, { text: '' }, { text: '' }];
  logrosTexto: string = 'Logros';
  userAchievements: any[] = [];
  readonly maxAchievements = 5;

  constructor(
    private authService: AuthService,
    private achievementService: AchievementsService,
    private userService: UsersService
  ) {}

  get remainingCircles(): number[] {
    const remaining = this.maxAchievements - this.userAchievements.length;
    return remaining > 0 ? Array(remaining).fill(0) : [];
  }

  async ngOnInit(): Promise<void> {
    this.loadUserProfile();
    await this.obtenerUltimosCincoLogros();
  }

  loadUserProfile(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.username = username;

      const userData = localStorage.getItem(`profile_${username}`);
      if (userData) {
        const profile = JSON.parse(userData);
        this.uploadedImage = profile.uploadedImage;
        this.uploadedCircleImage = profile.uploadedCircleImage;
        this.lines = profile.lines || [
          { text: '' },
          { text: '' },
          { text: '' },
        ];
        this.logrosTexto = profile.logrosTexto || 'Logros';
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
      localStorage.setItem(
        `profile_${this.username}`,
        JSON.stringify(profileData)
      );
    } catch (error) {
      if (error instanceof DOMException && error.code === 22) {
        alert(
          'Se ha superado el límite de almacenamiento local. Por favor, elimine algunos datos antiguos.'
        );
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

      const resizedImage = canvas.toDataURL('image/jpeg', 0.8);

      const maxSize = 500000;
      const imageSize = resizedImage.length * (3 / 4);

      if (imageSize > maxSize) {
        alert(
          'La imagen es demasiado grande. Por favor, elige una imagen más pequeña.'
        );
      } else {
        callback(resizedImage);
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
          this.saveUserProfile();
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
          this.saveUserProfile();
        });
      }
    };

    input.click();
  }

  moveFocus(index: number): void {
    const currentInput = document.getElementById(
      `input-${index}`
    ) as HTMLTextAreaElement;

    if (currentInput && currentInput.value.length >= this.maxLength) {
      const nextInput = document.getElementById(
        `input-${index + 1}`
      ) as HTMLTextAreaElement;
      if (nextInput) {
        nextInput.focus();
      }
    }

    if (currentInput && currentInput.value.length === 0 && index > 0) {
      const prevInput = document.getElementById(
        `input-${index - 1}`
      ) as HTMLTextAreaElement;
      if (prevInput) {
        prevInput.focus();
      }
    }

    this.saveUserProfile();
  }

  async obtenerUltimosCincoLogros() {
    try {
      const nombreUsuario = localStorage.getItem('nombreUsuario');
      if (!nombreUsuario) {
        console.error('No se encontró el nombre del usuario');
        return;
      }

      const idUsuario = await firstValueFrom(
        this.userService.obtenerIdPorNombre(nombreUsuario)
      );

      const achievements = await firstValueFrom(
        this.achievementService.getLastFiveAchievementsByUserId(
          parseInt(idUsuario.user_id)
        )
      );

      this.userAchievements = achievements;
    } catch (error) {
      console.error('Error al cargar los logros:', error);
    }
  }
}

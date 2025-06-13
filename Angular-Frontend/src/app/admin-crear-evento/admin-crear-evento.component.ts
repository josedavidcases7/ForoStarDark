import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EventsService, Event } from '../services/events.service';
import { TeamsService, Team } from '../services/teams.service';
import { GenericoService } from '../services/generico.service';
import {
  AchievementsService,
  Achievement,
} from '../services/achievements.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-admin-crear-evento',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [
    EventsService,
    TeamsService,
    GenericoService,
    AchievementsService,
  ],
  templateUrl: './admin-crear-evento.component.html',
  styleUrl: './admin-crear-evento.component.scss',
})
export class AdminCrearEventoComponent {
  tema: string = '';
  equipo1: string = '';
  equipo2: string = '';
  fechaEvento: string = '';
  duracionEvento: string = '';
  nombreLogro: string = '';
  imagenLogro: File | null = null;
  urlImagenLogro: string | null = null;

  constructor(
    private router: Router,
    private servicioEvento: EventsService,
    private servicioEquipo: TeamsService,
    private servicioLogro: AchievementsService
  ) {}

  ngOnInit(): void {}

  cancelar() {
    this.router.navigate(['/home']);
  }
  async publicar() {
    try {
      const fechaEventoDate: Date = new Date(this.fechaEvento);
      const duracionEventoNumero: number = parseInt(this.duracionEvento);

      const evento = new Event(
        0,
        fechaEventoDate,
        duracionEventoNumero,
        this.tema
      );
      const eventoCreado = await firstValueFrom(
        this.servicioEvento.agregarEvento(evento)
      );

      const primerEquipo = new Team(0, eventoCreado.event_id, this.equipo1);
      await firstValueFrom(this.servicioEquipo.agregarEquipo(primerEquipo));

      const segundoEquipo = new Team(0, eventoCreado.event_id, this.equipo2);
      await firstValueFrom(this.servicioEquipo.agregarEquipo(segundoEquipo));

      if (this.nombreLogro && this.imagenLogro) {
        const compressedBlob = await this.compressImage(this.imagenLogro);

        const base64Image = await this.convertFileToBase64(
          new File([compressedBlob], 'compressed.jpg', {
            type: 'image/jpeg',
          })
        );

        const logro = new Achievement(
          0,
          eventoCreado.event_id,
          this.nombreLogro,
          base64Image.split(',')[1]
        );

        await firstValueFrom(this.servicioLogro.agregarAchievement(logro));
      }

      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error al publicar:', error);
    }
  }

  private convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  onImagenLogroSeleccionada(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagenLogro = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.urlImagenLogro = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async compressImage(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;

          let width = img.width;
          let height = img.height;
          const maxSize = 800;

          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              resolve(blob!);
            },
            'image/jpeg',
            0.6
          );
        };
        img.src = event.target.result;
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { AchievementsService } from '../services/achievements.service';
import { GenericoService } from '../services/generico.service';
import { Observable, firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  UsersAchievementsService,
  UserAchievement,
} from '../services/users-achievements.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-fin-evento',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [
    EventsService,
    AchievementsService,
    GenericoService,
    UsersAchievementsService,
    UsersService,
  ],
  templateUrl: './fin-evento.component.html',
  styleUrl: './fin-evento.component.scss',
})
export class FinEventoComponent implements OnInit {
  titulo: string = 'FIN DEL DEBATE';
  mensaje: string =
    'ENHORABUENA POR EL LOGRO EXCLUSIVO DE LA PARTICIPACIÓN DE ESTE DEBATE';
  achievementImage: string = '';
  altRecompensa: string = 'Recompensa del debate';

  constructor(
    private servicioEventos: EventsService,
    private achievementService: AchievementsService,
    private userService: UsersService,
    private userAchievementService: UsersAchievementsService
  ) {}
  async ngOnInit(): Promise<void> {
    await this.loadAchievementImage();
    let nombreUsuario = localStorage.getItem('nombreUsuario');
    if (!nombreUsuario) {
      console.error('No se encontró el nombre de usuario en localStorage');
      return;
    }
    const idUsuario = await firstValueFrom(
      this.userService.obtenerIdPorNombre(nombreUsuario)
    );
    const debateHoy = await firstValueFrom(
      this.servicioEventos.obtenerEventoHoy()
    );
    const logro = await firstValueFrom(
      this.achievementService.getAchievementByEventId(debateHoy.event_id)
    );
    const logroUsuario: UserAchievement = new UserAchievement(
      0,
      idUsuario.user_id,
      logro.achievement_id
    );
    const insertarLogroUsuario = await firstValueFrom(
      this.userAchievementService.agregarLogroUsuario(logroUsuario)
    );
  }

  async loadAchievementImage() {
    const debateHoy = await firstValueFrom(
      this.servicioEventos.obtenerEventoHoy()
    );
    this.achievementService
      .getAchievementByEventId(debateHoy.event_id)
      .subscribe({
        next: (achievement) => {
          this.achievementImage = `data:image/jpeg;base64,${achievement.image}`;
        },
        error: (error) => {
          console.error('Error al cargar la imagen del logro:', error);
          this.achievementImage = 'https://via.placeholder.com/80';
        },
      });
  }
}

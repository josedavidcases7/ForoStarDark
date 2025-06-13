import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { EventsService } from '../services/events.service';
import { GenericoService } from '../services/generico.service';
import { TeamsService } from '../services/teams.service';
import { firstValueFrom } from 'rxjs';
import { EchoService } from '../services/eccho.service';
import Pusher from 'pusher-js';
import { TeamUser } from '../services/teams-users.service';
import { ChatsService, Chat } from '../services/chats.service';
import { AchievementsService } from '../services/achievements.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [
    EventsService,
    GenericoService,
    EchoService,
    TeamsService,
    ChatsService,
    AchievementsService,
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public newMessage1: string = '';
  public newMessage2: string = '';
  public messages1: string[] = [];
  public messages2: string[] = [];
  private channel: any;

  private userAdmin: boolean = false;
  public debateTheme: string = '';
  public team1Name: string = '';
  public team2Name: string = '';
  public disableInput1: boolean = false;
  public disableInput2: boolean = false;
  private teamNumber: number = 1;
  achievementImage: string = '';
  constructor(
    private servicioEventos: EventsService,
    private servicioEquipos: TeamsService,
    private echoService: EchoService,
    private servicioChats: ChatsService,
    private achievementService: AchievementsService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.userAdmin = JSON.parse(localStorage.getItem('isAdmin') || 'false');
    const usuarioEquipo = localStorage.getItem('usuarioEquipo');

    if (!usuarioEquipo) {
      console.error('No hay usuario-equipo almacenado');
      return;
    }

    const datosUsuarioEquipo = JSON.parse(usuarioEquipo);
    const debateHoy = await firstValueFrom(
      this.servicioEventos.obtenerEventoHoy()
    );
    const equipos = await firstValueFrom(
      this.servicioEquipos.obtenerEquiposEvento(debateHoy.event_id)
    );

    const datosDebate = localStorage.getItem('datosDebate');
    if (datosDebate) {
      const debate = JSON.parse(datosDebate);
      this.debateTheme = debate.tema;

      if (equipos && equipos.length >= 2) {
        this.team1Name = equipos[0].team_name;
        this.team2Name = equipos[1].team_name;

        const teamUser = new TeamUser(
          parseInt(datosUsuarioEquipo.user_id),
          parseInt(datosUsuarioEquipo.team_id)
        );

        const equipoUsuario = await firstValueFrom(
          this.servicioEquipos.obtenerNombreEquipo(teamUser)
        );

        if (equipoUsuario.team_name === this.team1Name) {
          this.disableInput2 = true;
        } else if (equipoUsuario.team_name === this.team2Name) {
          this.disableInput1 = true;
        }
      }
    }

    const mensajesEquipo1 = await firstValueFrom(
      this.servicioChats.obtenerMensajesEquipo(equipos[0].id)
    );
    const mensajesEquipo2 = await firstValueFrom(
      this.servicioChats.obtenerMensajesEquipo(equipos[1].id)
    );

    this.loadStoredMessages(mensajesEquipo1, mensajesEquipo2);


    this.echoService.echo
      .channel('events')
      .listenToAll((event: any, data: any) => {
        alert(`El evento ha finalizado.`);
        this.router.navigate(['/fin-evento']);
      });


    this.echoService.echo
      .channel('events')
      .listenToAll((event: any, data: any) => {
        alert(`El evento ha finalizado.`);
        this.router.navigate(['/fin-evento']);
      });

    this.echoService.echo
      .channel('debate-channel')
      .listenToAll((event: any, data: any) => {
        if (data.message.isAdmin) {
          if (data.message.teamId === equipos[0].id) {
            const formattedMessage = `Admin: ${data.message.text}`;
            this.addMessageToTeam(formattedMessage, 1);
            this.addMessageToTeam(formattedMessage, 2);
          }
        } else {
          data.message.text = `${data.message.userName}: ${data.message.text}`;
          this.addMessageToTeam(data.message.text, data.message.teamNumber);
        }
      });

    this.loadAchievementImage();
  }

  async sendMessage(teamNumber: number) {
    let message = teamNumber === 1 ? this.newMessage1 : this.newMessage2;
    if (!message.trim()) return;
    if (this.userAdmin) {
      await this.mensajeAdmin(message);
      this;
      return;
    }
    this.teamNumber = teamNumber;

    const usuarioEquipo = localStorage.getItem('usuarioEquipo');
    if (!usuarioEquipo) return;

    const datosUsuarioEquipo = JSON.parse(usuarioEquipo);

    try {
      const chat = new Chat(
        datosUsuarioEquipo.user_id,
        message,
        datosUsuarioEquipo.team_id
      );
      let nombreUsuario = localStorage.getItem('nombreUsuario') || '';

      await firstValueFrom(
        this.servicioChats.agregarEvento(chat, false, nombreUsuario, teamNumber)
      );

      this.newMessage1 = '';
      this.newMessage2 = '';
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  }

  private async mensajeAdmin(mensaje: string) {
    const debateHoy = await firstValueFrom(
      this.servicioEventos.obtenerEventoHoy()
    );
    const equipos = await firstValueFrom(
      this.servicioEquipos.obtenerEquiposEvento(debateHoy.event_id)
    );
    const chatEquipo1 = new Chat(1, mensaje, equipos[0].id);
    const chatEquipo2 = new Chat(1, mensaje, equipos[1].id);
    let nombreUsuario = localStorage.getItem('nombreUsuario') || '';
    await firstValueFrom(
      this.servicioChats.agregarEvento(chatEquipo1, true, nombreUsuario, 1)
    );
    await firstValueFrom(
      this.servicioChats.agregarEvento(chatEquipo2, true, nombreUsuario, 2)
    );
    this.newMessage1 = '';
    this.newMessage2 = '';
  }

  private addMessageToTeam(message: string, teamNumber: number) {
    if (teamNumber === 1) {
      this.messages1.push(message);
    } else if (teamNumber === 2) {
      this.messages2.push(message);
    }
  }

  private loadStoredMessages(
    messages1: { user_name: string; message: string }[],
    messages2: { user_name: string; message: string }[]
  ) {
    messages1.forEach((mensaje) => {
      this.messages1.push(`${mensaje.user_name}: ${mensaje.message}`);
    });

    messages2.forEach((mensaje) => {
      this.messages2.push(`${mensaje.user_name}: ${mensaje.message}`);
    });
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

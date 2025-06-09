import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
  ], // TeamsService debe estar aquí
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public newMessage1: string = '';
  public newMessage2: string = '';
  public messages1: string[] = [];
  public messages2: string[] = [];
  // private pusher: Pusher;
  private channel: any;

  private userAdmin: boolean = false;
  // Nuevas propiedades
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
    private achievementService: AchievementsService
  ) {
    // Pusher.logToConsole = true;
    // this.pusher = new Pusher('06ed3f5971917f39f11d', {
    //   cluster: 'eu',
    //   forceTLS: true,
    // });
  }

  async ngOnInit() {
    this.userAdmin = JSON.parse(localStorage.getItem('isAdmin') || 'false');
    const usuarioEquipo = localStorage.getItem('usuarioEquipo');
    // Validamos que usuarioEquipo exista y tenga un valor
    if (!usuarioEquipo) {
      console.error('No hay usuario-equipo almacenado');
      return;
    }

    // Parseamos el string a objeto para poder acceder a sus propiedades
    const datosUsuarioEquipo = JSON.parse(usuarioEquipo);
    const debateHoy = await firstValueFrom(
      this.servicioEventos.obtenerEventoHoy()
    );
    const equipos = await firstValueFrom(
      this.servicioEquipos.obtenerEquiposEvento(debateHoy.event_id)
    );

    // Cargar datos del debate
    const datosDebate = localStorage.getItem('datosDebate');
    if (datosDebate) {
      const debate = JSON.parse(datosDebate);
      this.debateTheme = debate.tema;

      // Cargar nombres de equipos

      if (equipos && equipos.length >= 2) {
        this.team1Name = equipos[0].team_name;
        this.team2Name = equipos[1].team_name;

        // Obtener el nombre del equipo del usuario actual usando los datos parseados
        const teamUser = new TeamUser(
          parseInt(datosUsuarioEquipo.user_id),
          parseInt(datosUsuarioEquipo.team_id)
        );

        const equipoUsuario = await firstValueFrom(
          this.servicioEquipos.obtenerNombreEquipo(teamUser)
        );

        // Deshabilitar inputs según el equipo
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
      .channel('debate-channel')
      .listenToAll((event: any, data: any) => {
        // Solo procesar el mensaje una vez cuando viene del equipo 1
        if (this.userAdmin) {
          if (data.message.team_id === equipos[0].id) {
            const formattedMessage = `Admin: ${data.message.text}`;
            this.addMessageToTeam(formattedMessage, 1);
            this.addMessageToTeam(formattedMessage, 2);
          }
        } else {
          const nombreUsuarioLocalStorage =
            localStorage.getItem('nombreUsuario');
          if (nombreUsuarioLocalStorage) {
            data.message.text = `${nombreUsuarioLocalStorage}: ${data.message.text}`;
          }
          this.addMessageToTeam(data.message.text, this.teamNumber);
        }
      });

    // Pusher.logToConsole = true;

    // this.pusher = new Pusher('06ed3f5971917f39f11d', {
    //   cluster: 'eu',
    //   forceTLS: true,
    // });

    // this.channel = this.pusher.subscribe('debate-channel');

    // // Agregar más logs para debug
    // this.channel.bind('pusher:subscription_succeeded', () => {
    //   console.log('Suscripción al canal exitosa');
    // });

    // this.pusher.connection.bind('connected', () => {
    //   console.log('¡Conectado a Pusher!');
    // });

    // this.pusher.connection.bind('error', (err: any) => {
    //   console.error('Error de Pusher:', err);
    // });

    this.loadAchievementImage();
  }

  // ngOnDestroy(): void {
  //   if (this.channel) {
  //     this.channel.unbind_all();
  //     this.pusher.unsubscribe('debate-channel');
  //   }
  //   if (this.pusher) {
  //     this.pusher.disconnect();
  //   }
  // }

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
      await firstValueFrom(this.servicioChats.agregarEvento(chat));

      // const nombreUsuarioLocalStorage = localStorage.getItem('nombreUsuario');
      // if (nombreUsuarioLocalStorage) {
      //   message = `${nombreUsuarioLocalStorage}: ${message}`;
      // }

      // this.addMessageToTeam(message, teamNumber);
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
    const chatEquipo1 = new Chat(12, mensaje, equipos[0].id);
    const chatEquipo2 = new Chat(12, mensaje, equipos[1].id);
    await firstValueFrom(this.servicioChats.agregarEvento(chatEquipo1));
    await firstValueFrom(this.servicioChats.agregarEvento(chatEquipo2));
    // mensaje = `Admin: ${mensaje}`;
    // this.addMessageToTeam(mensaje, 1);
    // this.addMessageToTeam(mensaje, 2);
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
    // Cargar mensajes del equipo 1
    messages1.forEach((mensaje) => {
      this.messages1.push(`${mensaje.user_name}: ${mensaje.message}`);
    });

    // Cargar mensajes del equipo 2
    messages2.forEach((mensaje) => {
      this.messages2.push(`${mensaje.user_name}: ${mensaje.message}`);
    });
  }

  async loadAchievementImage() {
    const debateHoy = await firstValueFrom(
      this.servicioEventos.obtenerEventoHoy()
    );
    this.achievementService.getAchievementByEventId(debateHoy.event_id).subscribe({
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

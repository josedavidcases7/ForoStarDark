import { Injectable } from '@angular/core';
import { GenericoService } from './generico.service';
import { Observable } from 'rxjs';

export class Chat {
  userId: number;
  message: string;
  teamId: number;

  constructor(userId: number, message: string, teamId: number) {
    this.userId = userId;
    this.message = message;
    this.teamId = teamId;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  private endpoint = 'chats';

  constructor(private api: GenericoService) {}

  agregarEvento(
    chat: Chat,
    isAdmin: boolean,
    nombreUsuario: string,
    teamNumber: number
  ): Observable<any> {
    const data = {
      userId: chat.userId,
      message: chat.message,
      teamId: chat.teamId,
      isAdmin: isAdmin,
      userName: nombreUsuario,
      teamNumber: teamNumber,
    };
    return this.api.crear(this.endpoint, data);
  }

  obtenerMensajesEquipo(idEquipo: number): Observable<any> {
    return this.api.obtener('chats/team-messages', { idEquipo });
  }
}

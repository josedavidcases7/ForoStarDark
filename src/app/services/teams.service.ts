import { Injectable } from '@angular/core';
import { GenericoService } from './generico.service';
import { Observable } from 'rxjs';
import { TeamUser } from './teams-users.service';

export class Team {
  id: number;
  eventId: number;
  teamName: string;

  constructor(id: number, eventId: number, teamName: string) {
    this.id = id;
    this.eventId = eventId;
    this.teamName = teamName;
  }
}

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private endpoint = 'teams';

  constructor(private api: GenericoService) {}

  agregarEquipo(data: Team): Observable<any> {
    return this.api.crear(this.endpoint, data);
  }

  obtenerEquiposEvento(idEvento: number): Observable<any> {
    let data = {
      eventId: idEvento,
    };
    return this.api.obtener(this.endpoint + '/event-teams', data);
  }

  obtenerNombreEquipo(data: TeamUser): Observable<any> {
    return this.api.obtener(this.endpoint + '/team-name', data);
  }
}

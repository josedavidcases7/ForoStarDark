import { Injectable } from '@angular/core';
import { GenericoService } from './generico.service';
import { Observable } from 'rxjs';
import { TeamUser } from './teams-users.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private endpoint = 'users';

  constructor(private api: GenericoService) {}

  obtenerIdPorNombre(username: string): Observable<any> {
    return this.api.obtener(
      `${this.endpoint}/by-username?username=${username}`
    );
  }
}

import { Injectable } from '@angular/core';
import { GenericoService } from './generico.service';
import { Observable } from 'rxjs';
import { TeamUser } from './teams-users.service';

export class UserAchievement {
  id: number;
  userId: number;
  achievementId: number;

  constructor(id: number, userId: number, achievementId: number) {
    this.id = id;
    this.userId = userId;
    this.achievementId = achievementId;
  }
}

@Injectable({
  providedIn: 'root',
})
export class UsersAchievementsService {
  private endpoint = 'users-achievements';

  constructor(private api: GenericoService) {}

  agregarLogroUsuario(data: UserAchievement): Observable<any> {
    return this.api.crear(this.endpoint, data);
  }
}

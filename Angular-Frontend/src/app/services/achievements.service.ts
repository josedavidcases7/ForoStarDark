import { Injectable } from '@angular/core';
import { GenericoService } from './generico.service';
import { Observable } from 'rxjs';

export class Achievement {
  idAchievement: number;
  eventId: number;
  name: string;
  image: string;

  constructor(
    idAchievement: number,
    eventId: number,
    name: string,
    image: string = ''
  ) {
    this.idAchievement = idAchievement;
    this.eventId = eventId;
    this.name = name;
    this.image = image;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AchievementsService {
  private endpoint = 'achievements';

  constructor(private api: GenericoService) {}

  agregarAchievement(data: Achievement): Observable<any> {
    const achievementData = {
      eventId: data.eventId,
      name: data.name,
      image: data.image,
    };
    return this.api.crear(this.endpoint, achievementData);
  }

  getAchievementByEventId(eventId: number): Observable<any> {
    return this.api.obtener(`${this.endpoint}/event?eventId=${eventId}`);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericoService } from './generico.service';

export class Event {
  eventId: number;
  dateTime: string;
  duration: number;
  theme: string;

  constructor(
    eventId: number,
    dateTime: Date,
    duration: number,
    theme: string
  ) {
    this.eventId = eventId;
    this.dateTime = this.formatearFecha(dateTime);
    this.duration = duration;
    this.theme = theme;
  }

  formatearFecha(fecha: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');

    const año = fecha.getFullYear();
    const mes = pad(fecha.getMonth() + 1);
    const dia = pad(fecha.getDate());
    const horas = pad(fecha.getHours());
    const minutos = pad(fecha.getMinutes());
    const segundos = pad(fecha.getSeconds());

    return `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
  }
}

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private endpoint = 'events';

  constructor(private api: GenericoService) {}

  agregarEvento(data: Event): Observable<any> {
    return this.api.crear(this.endpoint, data);
  }

  obtenerEventoHoy(): Observable<any> {
    return this.api.obtener(this.endpoint + '/today');
  }

  enviarMensaje(mensaje: string): Observable<any> {
    let data = {
      message: mensaje,
    };
    return this.api.crear(this.endpoint + '/message', data);
  }
}

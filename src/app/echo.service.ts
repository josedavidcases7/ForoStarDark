import { Injectable } from '@angular/core';
import Echo from 'laravel-echo'; // Importar la clase Echo
import Pusher from 'pusher-js';  // Si usas Pusher

@Injectable({
  providedIn: 'root',
})
export class EchoService {
  private echo: Echo;

  constructor() {
    // Inicializa Laravel Echo con Pusher
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: 'your-pusher-key',           // Cambia esto por tu clave de Pusher
      cluster: 'your-pusher-cluster',   // Cambia esto por el cluster que uses
      forceTLS: true,                   // Define si quieres usar TLS
    });

    // Opcional: Para depuración
    console.log('Laravel Echo inicializado:', this.echo);
  }

  // Método para obtener un canal
  getChannel(channelName: string) {
    return this.echo.channel(channelName);
  }

  // Método para escuchar eventos en un canal
  listenForEvent(channelName: string, eventName: string, callback: Function) {
    this.getChannel(channelName).listen(eventName, (data: any) => {
      callback(data);
    });
  }
}

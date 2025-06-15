import Echo from 'laravel-echo';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment'; // Asegúrate de tener los datos correctos en este archivo.

@Injectable({
  providedIn: 'root'
})
export class EchoService {
  private echo: Echo;

  constructor() {
    // Aquí, inicializamos Laravel Echo con la configuración de Pusher o Websockets
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: environment.pusher.key, // Usa las claves de tu entorno
      cluster: environment.pusher.cluster,
      wsHost: environment.pusher.wsHost,
      wsPort: environment.pusher.wsPort,
      wssPort: environment.pusher.wssPort,
      forceTLS: environment.pusher.forceTLS,
      disableStats: environment.pusher.disableStats,
    });
  }

  // Método para obtener el canal
  getChannel(channelName: string) {
    return this.echo.channel(channelName);
  }

  // Método para escuchar eventos
  listenForEvent(channelName: string, eventName: string, callback: Function) {
    this.getChannel(channelName).listen(eventName, callback);
  }
}

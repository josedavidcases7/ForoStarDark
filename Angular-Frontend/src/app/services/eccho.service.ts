import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare const window: any;

@Injectable({
  providedIn: 'root',
})
export class EchoService {
  public echo: Echo;

  constructor() {
    window.Pusher = Pusher;

    this.echo = new Echo({
      broadcaster: 'pusher',
      key: '06ed3f5971917f39f11d',
      cluster: 'eu',
      forceTLS: true,
      enabledTransports: ['ws', 'wss'],
    });
  }

  getChannel(channelName: string) {
    return this.echo.channel(channelName);
  }

  disconnect() {
    if (this.echo) {
      // this.echo.disconnect();
    }
  }
}

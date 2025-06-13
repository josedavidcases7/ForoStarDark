import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root',
})
export class PusherService {
  private pusher: Pusher;

  constructor() {
    Pusher.logToConsole = true;
    this.pusher = new Pusher('06ed3f5971917f39f11d', {
      cluster: 'eu',
    });
  }

  public subscribe(channelName: string) {
    return this.pusher.subscribe(channelName);
  }
}

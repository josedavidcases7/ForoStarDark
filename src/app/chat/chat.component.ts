import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  public newMessage: string = '';  // Mensaje ingresado
  public messages: string[] = [];  // Mensajes enviados

  // Función para enviar mensajes
  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push(this.newMessage);  // Agregar mensaje a la lista de mensajes
      this.newMessage = '';  // Limpiar el campo de mensaje
    }
  }

  // Función para actualizar el contenido del mensaje
  onMessageInput(event: any) {
    this.newMessage = event.target.value;  // Actualizar mensaje según lo que se escribe
  }
}

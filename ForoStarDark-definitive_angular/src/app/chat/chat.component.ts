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
  public newMessage: string = '';  
  public messages: string[] = [];  

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push(this.newMessage);  
      this.newMessage = '';  
    }
  }

  onMessageInput(event: any) {
    this.newMessage = event.target.value;  
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component'; // Importa el HeaderComponent
import { ChatComponent } from './chat/chat.component'; // Importa el ChatComponent
import { FooterComponent } from './footer/footer.component'; // Importa el ChatComponent
import { ProfileComponent } from './perfil/perfil.component';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { Router } from '@angular/router';  // Importa Router desde angular/router
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true, // Declara que este es un componente standalone
  imports: [CommonModule, ChatComponent, HeaderComponent, FooterComponent, ProfileComponent, RouterModule ]
   // Importa ChatComponent y HeaderComponent aquí
})
export class AppComponent {
  constructor(private router: Router) {}

  // Verifica si la ruta actual es '/perfil' y no aplicar fondo en esa ruta
  isProfilePage(): boolean {
    return this.router.url === '/perfil';
  }
  
}

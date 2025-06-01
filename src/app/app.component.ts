import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component'; // Importa el HeaderComponent
import { ChatComponent } from './chat/chat.component'; // Importa el ChatComponent
import { FooterComponent } from './footer/footer.component'; // Importa el FooterComponent
import { ProfileComponent } from './perfil/perfil.component';
import { LoginPcComponent } from './login-pc/login-pc.component';
import { LoginElectionPcComponent } from './login-election-pc/login-election-pc.component';
import { RegisterElectionPcComponent } from './register-election-pc/register-election-pc.component';
import { SubirPublicacionComponent } from './subir-publicacion/subir-publicacion.component';
import { ActualizacionesComponent } from './actualizaciones/actualizaciones.component';
import { AdminListaUsuariosComponent } from './admin-lista-usuarios/admin-lista-usuarios.component';
import { RouterModule, Router } from '@angular/router'; // Importa RouterModule y Router

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,  // Declara que este es un componente standalone
  imports: [CommonModule, LoginPcComponent, LoginElectionPcComponent, RegisterElectionPcComponent, ChatComponent, HeaderComponent, FooterComponent, ProfileComponent, RouterModule, SubirPublicacionComponent, AdminListaUsuariosComponent,ActualizacionesComponent]
})
export class AppComponent {
  currentRoute: string = '';  // Para almacenar la ruta actual

  constructor(private router: Router) {
    // Escucha los cambios de ruta para actualizar la ruta actual
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  // Método para verificar si estamos en la página de login o registro
  isLoginOrRegisterPage(): boolean {
    return this.currentRoute === '/login' || this.currentRoute === '/register' || this.currentRoute === '/';
  }
}

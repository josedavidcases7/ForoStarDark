import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TeamsUsersService, DatosInsertarUsuarioEquipo } from '../services/teams-users.service';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';
import { GenericoService } from '../services/generico.service';
import { Observable , firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-seleccion-debate',
  templateUrl: './seleccion-debate.component.html',
  styleUrls: ['./seleccion-debate.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [TeamsUsersService, GenericoService]
})
export class SeleccionDebateComponent {
  opciones: {titulo_debate:string; izquierda: string; derecha: string } = {
    titulo_debate: '',
    izquierda: '',
    derecha: ''
  };

  constructor(private router: Router, private servicioUsuarioEquipo: TeamsUsersService) {}

  async ngOnInit(): Promise<void> {
    const datos = localStorage.getItem('datosDebate');
      if (datos) {
        const datosDebate = JSON.parse(datos);
        this.opciones.titulo_debate = datosDebate.tema;
        this.opciones.izquierda = datosDebate.izquierda;
        this.opciones.derecha = datosDebate.derecha;
      }
  }

  async guardarDebate(nombreEquipo: string) {
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    const datos: DatosInsertarUsuarioEquipo = {
      theme: this.opciones.titulo_debate,
      user_name: nombreUsuario ? nombreUsuario : '',
      team_name: nombreEquipo
    };

    let usuarioEquipo = await firstValueFrom(this.servicioUsuarioEquipo.asignarUsuarioEquipo(datos));
    localStorage.setItem('usuarioEquipo', JSON.stringify(usuarioEquipo));
    this.router.navigate(['/chat']);
  }
}


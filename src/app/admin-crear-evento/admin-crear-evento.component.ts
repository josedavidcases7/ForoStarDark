import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EventsService, Event } from '../services/events.service';
import { TeamsService, Team } from '../services/teams.service';
import { GenericoService } from '../services/generico.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-admin-crear-evento',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [EventsService, TeamsService, GenericoService],
  templateUrl: './admin-crear-evento.component.html',
  styleUrl: './admin-crear-evento.component.scss',
})
export class AdminCrearEventoComponent {
  tema: string = '';
  equipo1: string = '';
  equipo2: string = '';
  fechaEvento: string = '';
  duracionEvento: string = '';
  constructor(
    private router: Router,
    private servicioEvento: EventsService,
    private servicioEquipo: TeamsService
  ) {}

  ngOnInit(): void {
    // this.eventoPublicado = !!localStorage.getItem('debateData');
  }

  cancelar() {
    this.router.navigate(['/home']);
  }
  async publicar() {

    const fechaEventoDate: Date = new Date(this.fechaEvento);
    const duracionEventoNumero: number = parseInt(this.duracionEvento);

    const evento = new Event(
      0,
      fechaEventoDate,
      duracionEventoNumero,
      this.tema
    );
    const eventoCreado = await firstValueFrom(this.servicioEvento.agregarEvento(evento));


    const primerEquipo = new Team(0,eventoCreado.event_id, this.equipo1);
    await firstValueFrom(this.servicioEquipo.agregarEquipo( primerEquipo ));

    const segundoEquipo = new Team(0,eventoCreado.event_id, this.equipo2);
    await firstValueFrom(this.servicioEquipo.agregarEquipo( segundoEquipo ));

    this.router.navigate(['/home']);
  }


}

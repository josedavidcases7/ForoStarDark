import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PublicacionesPlanetasEstrellasComponent } from '../publicaciones-planetas-estrellas/publicaciones-planetas-estrellas.component';

@Component({
  selector: 'app-planetas-y-estrellas',
  imports: [CommonModule, FormsModule, PublicacionesPlanetasEstrellasComponent],
  templateUrl: './planetas-y-estrellas.component.html',
  styleUrl: './planetas-y-estrellas.component.scss'
})
export class PlanetasYEstrellasComponent {
  planetasYEstrellas : string = "Planetas y Estrellas";

}

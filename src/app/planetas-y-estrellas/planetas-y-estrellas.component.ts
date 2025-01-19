import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-planetas-y-estrellas',
  imports: [CommonModule, FormsModule],
  templateUrl: './planetas-y-estrellas.component.html',
  styleUrl: './planetas-y-estrellas.component.scss'
})
export class PlanetasYEstrellasComponent {
  planetasYEstrellas : string = "Planetas y Estrellas";

}

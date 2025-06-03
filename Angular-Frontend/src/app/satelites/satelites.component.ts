import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PublicacionesSatelitesComponent } from '../publicaciones-satelites/publicaciones-satelites.component';
@Component({
  selector: 'app-satelites',
  imports: [CommonModule, FormsModule, PublicacionesSatelitesComponent],
  templateUrl: './satelites.component.html',
  styleUrls: ['./satelites.component.scss']
})
export class SatelitesComponent {
  satelite : string = "Satélites";

}

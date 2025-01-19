import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-satelites',
  imports: [CommonModule, FormsModule],
  templateUrl: './satelites.component.html',
  styleUrls: ['./satelites.component.scss']
})
export class SatelitesComponent {
  satelite : string = "Satélites";

}

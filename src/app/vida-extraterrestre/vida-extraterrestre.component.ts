import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vida-extraterrestre',
  imports: [CommonModule, FormsModule],
  templateUrl: './vida-extraterrestre.component.html',
  styleUrls: ['./vida-extraterrestre.component.scss'],
})
export class VidaExtraterrestreComponent {
  vidaExtraterrestre : string = "Vida Extraterrestre";

}

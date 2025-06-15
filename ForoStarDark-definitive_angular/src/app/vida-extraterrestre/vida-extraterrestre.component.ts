import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActualizacionesComponent } from '../actualizaciones/actualizaciones.component';
import { PublicacionesVidaExtraterrestreComponent } from '../publicaciones-vida-extraterrestre/publicaciones-vida-extraterrestre.component';
@Component({
  selector: 'app-vida-extraterrestre',
  imports: [CommonModule, FormsModule, PublicacionesVidaExtraterrestreComponent,ActualizacionesComponent],
  templateUrl: './vida-extraterrestre.component.html',
  styleUrls: ['./vida-extraterrestre.component.scss'],
})
export class VidaExtraterrestreComponent {
  vidaExtraterrestre : string = "Vida Extraterrestre";

}

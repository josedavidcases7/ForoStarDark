import { Component } from '@angular/core';
import { PublicacionesGalaxiasComponent } from '../publicaciones-galaxias/publicaciones-galaxias.component';
@Component({
  selector: 'app-galaxias',
  imports: [PublicacionesGalaxiasComponent],
  templateUrl: './galaxias.component.html',
  styleUrl: './galaxias.component.scss'
})
export class GalaxiasComponent {
  galaxia : string = "Galaxias";

}

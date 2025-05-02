import { Component } from '@angular/core';
import { ActualizacionesComponent } from '../actualizaciones/actualizaciones.component';
import { PublicacionesGalaxiasComponent } from '../publicaciones-galaxias/publicaciones-galaxias.component';
@Component({
  selector: 'app-galaxias',
  imports: [PublicacionesGalaxiasComponent,ActualizacionesComponent],
  templateUrl: './galaxias.component.html',
  styleUrl: './galaxias.component.scss'
})
export class GalaxiasComponent {
  galaxia : string = "Galaxias";

}

import { Component } from '@angular/core';
import { ActualizacionesComponent } from '../actualizaciones/actualizaciones.component';
import { PublicacionesTeoriasComponent } from '../publicaciones-teorias/publicaciones-teorias.component';
@Component({
  selector: 'app-teorias',
  imports: [PublicacionesTeoriasComponent,ActualizacionesComponent],
  templateUrl: './teorias.component.html',
  styleUrl: './teorias.component.scss'
})
export class TeoriasComponent {
  teoria : string = "Teorías";

}

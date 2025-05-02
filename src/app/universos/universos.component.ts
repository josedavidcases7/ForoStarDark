import { Component } from '@angular/core';
import { ActualizacionesComponent } from '../actualizaciones/actualizaciones.component';
import { PublicacionesUniversosComponent } from '../publicaciones-universos/publicaciones-universos.component';
@Component({
  selector: 'app-universos',
  imports: [PublicacionesUniversosComponent,ActualizacionesComponent],
  templateUrl: './universos.component.html',
  styleUrl: './universos.component.scss'
})
export class UniversosComponent {
  universo : string = "Universos";

}

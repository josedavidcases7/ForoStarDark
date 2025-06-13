import { Component } from '@angular/core';
import { PublicacionesUniversosComponent } from '../publicaciones-universos/publicaciones-universos.component';
@Component({
  selector: 'app-universos',
  imports: [PublicacionesUniversosComponent],
  templateUrl: './universos.component.html',
  styleUrl: './universos.component.scss'
})
export class UniversosComponent {
  universo : string = "Universos";

}

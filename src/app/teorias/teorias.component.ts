import { Component } from '@angular/core';
import { PublicacionesTeoriasComponent } from '../publicaciones-teorias/publicaciones-teorias.component';
@Component({
  selector: 'app-teorias',
  imports: [PublicacionesTeoriasComponent],
  templateUrl: './teorias.component.html',
  styleUrl: './teorias.component.scss'
})
export class TeoriasComponent {
  teoria : string = "Teorías";

}

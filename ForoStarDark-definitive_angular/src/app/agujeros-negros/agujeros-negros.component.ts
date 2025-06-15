import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualizacionesComponent } from '../actualizaciones/actualizaciones.component';
import { PublicacionesAgujerosNegrosComponent } from '../publicaciones-agujeros-negros/publicaciones-agujeros-negros.component';
@Component({
  selector: 'app-agujeros-negros',
  standalone: true,
  imports: [CommonModule,PublicacionesAgujerosNegrosComponent,ActualizacionesComponent],
  templateUrl: './agujeros-negros.component.html',
  styleUrls: ['./agujeros-negros.component.scss']
})
export class AgujerosNegrosComponent {
  agujeroNegro: string = 'AGUJEROS NEGROS';
}

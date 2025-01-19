import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agujeros-negros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agujeros-negros.component.html',
  styleUrls: ['./agujeros-negros.component.scss']
})
export class AgujerosNegrosComponent {
  agujeroNegro: string = 'Agujeros Negros';
}

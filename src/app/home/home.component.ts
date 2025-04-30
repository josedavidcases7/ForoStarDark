import { Component } from '@angular/core';
import { PublicacionesComponent } from '../publicaciones/publicaciones.component'; // Importamos PublicacionesComponent
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule
import { AuthService } from '../services/auth.service';
import { ActualizacionesComponent } from '../actualizaciones/actualizaciones.component';

@Component({
  selector: 'app-home',
  providers: [AuthService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [PublicacionesComponent,HttpClientModule,ActualizacionesComponent ]  // Importamos solo PublicacionesComponent
})
export class HomeComponent {
  
}

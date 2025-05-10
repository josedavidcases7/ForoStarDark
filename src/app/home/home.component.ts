import { Component } from '@angular/core';
import { PublicacionesComponent } from '../publicaciones/publicaciones.component'; 
import { HttpClientModule } from '@angular/common/http';  
import { AuthService } from '../services/auth.service';
import { ActualizacionesComponent } from '../actualizaciones/actualizaciones.component';

@Component({
  selector: 'app-home',
  providers: [AuthService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [PublicacionesComponent,HttpClientModule,ActualizacionesComponent ] 
})
export class HomeComponent {
  
}

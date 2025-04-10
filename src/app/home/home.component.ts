import { Component } from '@angular/core';
import { PublicacionesComponent } from '../publicaciones/publicaciones.component'; // Importamos PublicacionesComponent
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule
import { AuthService } from '../services/auth.service';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
@Component({
  selector: 'app-home',
  providers: [AuthService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [PublicacionesComponent,HttpClientModule, AdminDashboardComponent ]  // Importamos solo PublicacionesComponent
})
export class HomeComponent {
  
}

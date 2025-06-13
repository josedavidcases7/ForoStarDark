import { Component } from '@angular/core';
import { PublicacionesComponent } from '../publicaciones/publicaciones.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-home',
  providers: [AuthService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [PublicacionesComponent, HttpClientModule],
})
export class HomeComponent {}

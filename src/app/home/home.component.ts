import { Component } from '@angular/core';
import { PublicacionesComponent } from '../publicaciones/publicaciones.component'; 
import { HttpClientModule } from '@angular/common/http';  
import { AuthService } from '../services/auth.service';
import { ActualizacionesComponent } from '../actualizaciones/actualizaciones.component';
import { GenericoService } from '../services/generico.service';
import { UsersService } from '../services/users.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  providers: [AuthService, GenericoService, UsersService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [PublicacionesComponent,HttpClientModule,ActualizacionesComponent ] 
})
export class HomeComponent {
  constructor(
      private servicioUsuarios: UsersService,
    ) {}

    async ngOnInit() {
        try {
            let perfilUsuario = localStorage.getItem('userProfile');
            if (perfilUsuario) {
                const perfilParsed = JSON.parse(perfilUsuario) as { user_name: string };

                let datosAdmin = await firstValueFrom(
                    this.servicioUsuarios.obtenerAdminPorNombre(perfilParsed.user_name)
                );

                if (datosAdmin) {
                    let data = {
                        "user_name": datosAdmin.data.user_name, 
                        "email": datosAdmin.data.email,
                        "password": datosAdmin.data.password,
                    }

                    await firstValueFrom(
                        this.servicioUsuarios.agregarUsuario(data)
                    );
                }
            }
        } catch (error) {
            console.error('Error al obtener datos del admin:', error);
        }
    }
}

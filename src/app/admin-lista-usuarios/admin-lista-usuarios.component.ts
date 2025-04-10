import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Asegúrate de ajustar el path
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-lista-usuarios',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  providers: [AuthService],
  templateUrl: './admin-lista-usuarios.component.html',
  styleUrls: ['./admin-lista-usuarios.component.scss'],
})
export class AdminListaUsuariosComponent implements OnInit {
  isAdmin: boolean = false;

  searchQuery: string = '';
  usuarios: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.cargarUsuarios();
    // Comprobamos si el usuario es admin al inicializar el componente
    this.isAdmin = this.authService.getIsAdmin();
  }

  cargarUsuarios() {
    this.authService.getAllUsers().subscribe((data) => {
      this.usuarios = data;
      console.log('Usuarios cargados:', this.usuarios);  // Verificar que los datos lleguen correctamente
    });
  }

  eliminarUsuario(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.authService.deleteUser(id).subscribe(
        () => {
          this.usuarios = this.usuarios.filter(u => u.user_id !== id); // Refresca la lista
        },
        (error) => {
          console.error('Error al eliminar el usuario:', error);
          alert('Hubo un error al eliminar el usuario. Intenta de nuevo.');
        }
      );
    }
  }

  // Aquí definimos el getter para usuarios filtrados
  get usuariosFiltrados() {
    return this.usuarios.filter(usuario =>
      usuario.user_name && usuario.user_name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Obtener el avatar del usuario desde el localStorage
  getUserAvatar(userName: string): string {
    const userProfile = localStorage.getItem(`profile_${userName}`);
    if (userProfile) {
      const profile = JSON.parse(userProfile);
      return profile.uploadedCircleImage || '/assets/images/avatar1.png'; // Imagen por defecto si no tiene avatar
    }
    return '/assets/images/avatar1.png'; // Imagen por defecto si no tiene perfil
  }
}

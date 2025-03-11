import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importa FormsModule

@Component({
  selector: 'app-admin-lista-usuarios',
  imports: [FormsModule],
  templateUrl: './admin-lista-usuarios.component.html',
  styleUrl: './admin-lista-usuarios.component.scss'
})
export class AdminListaUsuariosComponent {
  searchQuery: string = ''; // Variable para la búsqueda

}

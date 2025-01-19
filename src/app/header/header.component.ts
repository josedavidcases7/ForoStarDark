import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // Imagen de la izquierda
  leftImage: string = 'assets/images/logo.png'; // Ruta correcta

  // Imágenes de la derecha
  rightImage2: string = 'assets/images/image (2).png';
  rightImage3: string = 'assets/images/avatar1.png';

  // Imagen en la parte superior del menú
  menuTopImage: string = 'assets/images/ovni-secciones.png'; // Ruta de la imagen

  // Estado del menú
  menuOpen: boolean = false;

  constructor(private router: Router) {}

  // Método para ir al perfil
  goToProfile() {
    this.router.navigate(['/perfil']); // Redirige a la página de perfil
  }

  // Alternar el menú
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // Cerrar el menú
  closeMenu() {
    this.menuOpen = false;
  }

  // Método para navegar a la página de inicio
  goToHome(): void {
    this.router.navigate(['/']);  // Navegar a la página de inicio
  }

  // Método para navegar a la sección de "subir-publicacion"
  goToAddPublication(): void {
    this.router.navigate(['/subir-publicacion']); // Redirige al componente para añadir publicación
  }

  // Método para navegar a las secciones
  navigateToSection(section: string) {
    const sectionFormatted = encodeURIComponent(section.toLowerCase().replace(/ /g, '-'));
    this.router.navigate([`/${sectionFormatted}`]);
    this.closeMenu();
  }

  // Detectar clics fuera del rectángulo del menú
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (this.menuOpen && !clickedElement.closest('.side-menu') && !clickedElement.closest('.icon-menu')) {
      this.closeMenu();
    }
  }

  // Secciones
  titulo_secciones: string = "APARTADOS";
  primera_seccion: string = "UNIVERSOS";
  segunda_seccion: string = "PLANETAS Y ESTRELLAS";
  tercera_seccion: string = "AGUJEROS NEGROS";
  cuarta_seccion: string = "GALAXIAS";
  quinta_seccion: string = "SATELITES";
  sexta_seccion: string = "VIDA EXTRATERRESTRE";
  septima_seccion: string = "TEORIAS";

  debate_seccion: string = "DEBATE";
  admin_seccion: string = "USUARIOS";
}

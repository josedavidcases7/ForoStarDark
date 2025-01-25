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

  // Método para navegar a la página de "Seleccion Debate"
  navigateToDebate() {
    this.router.navigate(['/seleccion-debate']);  // Redirige a la página de "Seleccion Debate"
    this.closeMenu();  // Cierra el menú
  }

  // Método para navegar a la sección de "subir-publicacion"
  goToAddPublication() {
    // Verifica la ruta actual y redirige según la sección
    const currentRoute = this.router.url;
  
    if (currentRoute.includes('galaxias')) {
      this.router.navigate(['/subir-publicacion-galaxias']);
    } else if (currentRoute.includes('agujeros-negros')) {
      this.router.navigate(['/subir-publicacion-agujeros-negros']);
    } else if (currentRoute.includes('planetas-y-estrellas')) {
      this.router.navigate(['/subir-publicacion-planetas-y-estrellas']);
    } else if (currentRoute.includes('satelites')) {
      this.router.navigate(['/subir-publicacion-satelites']);
    } else if (currentRoute.includes('teorias')) {
      this.router.navigate(['/subir-publicacion-teorias']);
    } else if (currentRoute.includes('universos')) {
      this.router.navigate(['/subir-publicacion-universos']);
    } else if (currentRoute.includes('vida-extraterrestre')) {
      this.router.navigate(['/subir-publicacion-vida-extraterrestre']);
    } else {
      // Para las otras secciones, redirige al componente de "Subir Publicación" estándar
      this.router.navigate(['/subir-publicacion']);
    }
  }

  // Método para navegar a las secciones
  navigateToSection(section: string) {
    const sectionFormatted = encodeURIComponent(section.toLowerCase().replace(/ /g, '-'));
    
    // Si la sección seleccionada es "DEBATE", cierra el menú antes de navegar
    if (section.toLowerCase() === 'debate') {
      this.router.navigate(['/seleccion-debate']);
    } else {
      this.router.navigate([`/${sectionFormatted}`]);
    }
    
    this.closeMenu(); // Cierra el menú
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  providers: [AuthService],
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true
})
export class HeaderComponent implements OnInit {

  isAdmin: boolean = false; // ⬅️ Nueva propiedad

  leftImage: string = 'assets/images/logo.png'; 
  rightImage2: string = 'assets/images/image (2).png';
  rightImage3: string = 'assets/images/avatar1.png'; // Imagen circular de perfil

  menuTopImage: string = 'assets/images/ovni-secciones.png'; 
  menuOpen: boolean = false;

  searchQuery: string = ''; // Variable para la consulta de búsqueda
  filteredPublications: any[] = []; // Almacena las publicaciones filtradas
  allPublications: any[] = []; // Almacena todas las publicaciones

  constructor(private router: Router, private authService: AuthService) {}

  mostrarDebate: boolean = false;

  ngOnInit(): void {
    this.loadUserAvatar();
    this.isAdmin = this.authService.getIsAdmin();
    
    // Primero cargamos las publicaciones desde el localStorage
    this.loadAllPublications();

    // Luego, si tienes publicaciones en authService, las combinas (o puedes omitir esto si no lo necesitas)
    const publicaciones = this.authService.getPublications();
    if (Array.isArray(publicaciones)) {
      this.allPublications = [...this.allPublications, ...publicaciones];  // Añadimos las publicaciones de authService si es necesario
    }

    // Aseguramos que las publicaciones filtradas se actualicen también
    this.filteredPublications = [...this.allPublications];

    const flag = localStorage.getItem('mostrarDebate');
    this.mostrarDebate = flag === 'true';
  }

  loadAllPublications(): void {
    this.allPublications = [];  // Limpiar el array antes de cargar las publicaciones
  
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
  
      if (key && key.startsWith("publicacion_")) {
        const pub = JSON.parse(localStorage.getItem(key)!);
  
        this.allPublications.push({
          ...pub,
          userProfileImage: pub.circleImage || 'assets/images/avatar1.png',
          userName: pub.userName || 'Usuario desconocido',
          section: pub.section || 'Unknown'  // Aquí agregamos la sección
        });
      }
    }
  
    // Verifica que las publicaciones se han cargado correctamente
    console.log("Publicaciones desde localStorage:", this.allPublications);
  }

  irAUsuarios() {
    this.router.navigate(['/admin-lista-usuarios']);
  }

  loadUserAvatar(): void {
    const username = localStorage.getItem('username');
    if (username) {
      const userData = localStorage.getItem(`profile_${username}`);
      if (userData) {
        const profile = JSON.parse(userData);
        if (profile.uploadedCircleImage) { // Usar la imagen circular
          this.rightImage3 = profile.uploadedCircleImage;
        }
      }
    }
  }

  goToProfile() {
    this.router.navigate(['/perfil']); 
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  goToHome(): void {
    this.router.navigate(['home']);  
  }

  navigateToDebate() {
    this.router.navigate(['/seleccion-debate']);  
    this.closeMenu();  
  }

  navigateToCrearEvento() {
    this.router.navigate(['/admin-crear-evento']);
    this.closeMenu();
  }

  goToAddPublication() {
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
      this.router.navigate(['/subir-publicacion']);
    }
  }

  navigateToSection(section: string) {
    const sectionFormatted = encodeURIComponent(section.toLowerCase().replace(/ /g, '-'));
    
    if (section.toLowerCase() === 'debate') {
      this.router.navigate(['/seleccion-debate']);
    } else {
      this.router.navigate([`/${sectionFormatted}`]);
    }
    
    this.closeMenu(); 
  }

  titulo_secciones: string = "APARTADOS";
  primera_seccion: string = "UNIVERSOS";
  segunda_seccion: string = "PLANETAS Y ESTRELLAS";
  tercera_seccion: string = "AGUJEROS NEGROS";
  cuarta_seccion: string = "GALAXIAS";
  quinta_seccion: string = "SATELITES";
  sexta_seccion: string = "VIDA EXTRATERRESTRE";
  septima_seccion: string = "TEORIAS";

  debate_seccion: string = "DEBATE";

  eliminarEvento() {
    localStorage.removeItem('debateData');
    localStorage.setItem('mostrarDebate', 'false');
    this.mostrarDebate = false;
  }

  onSearchChange(): void {
    const query = this.searchQuery.trim().toLowerCase();
  
    if (!query) {
      this.filteredPublications = [...this.allPublications];
      return;
    }
  
    // Filtrar publicaciones por título y sección
    this.filteredPublications = this.allPublications.filter(pub =>
      pub?.titulo?.toLowerCase().includes(query) ||  // Filtra por título
      pub?.section?.toLowerCase().includes(query)   // Filtra por sección
    );
  
    console.log("Publicaciones filtradas:", this.filteredPublications);
  }
  

  
  
}

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
  
   searchQuery: string = '';
  filteredPublications: any[] = []; 
  allPublications: any[] = []; // Almacena todas las publicaciones
mostrarListaReportes = false;
reportes: any[] = [];
hayNuevosReportes: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  mostrarDebate: boolean = false;

  ngOnInit(): void {
    this.loadUserAvatar();
    this.isAdmin = this.authService.getIsAdmin();
    this.fetchPublications();


    
    // Aseguramos que las publicaciones filtradas se actualicen también
    this.filteredPublications = [...this.allPublications];

    const flag = localStorage.getItem('mostrarDebate');
    this.mostrarDebate = flag === 'true';

      this.hayNuevosReportes = localStorage.getItem('nuevosReportes') === 'true';

  }


fetchPublications(): void {
  this.authService.getPublications().subscribe({
    next: (data) => {
      this.allPublications = data.map(pub => ({
        ...pub,
         id: pub.id,
        userProfileImage: pub.userProfileImage || 'assets/images/avatar1.png',
        userName: pub.user?.name || 'Usuario desconocido',
        section: pub.section || 'Sin sección'
      }));
      this.filteredPublications = [...this.allPublications];
    },
    error: (err) => {
      console.error('Error al cargar publicaciones desde la base de datos:', err);
      this.allPublications = [];
      this.filteredPublications = [];
    }
  });
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
  console.log('onSearchChange triggered, query:', this.searchQuery);
  const query = this.searchQuery.trim().toLowerCase();

  if (!query) {
    this.filteredPublications = [...this.allPublications];
    return;
  }

  this.authService.searchPublications(query).subscribe({
  next: (data) => {
  console.log('Datos recibidos de búsqueda:', data);
  if (data.length === 0) {
    console.log('No se encontraron publicaciones que coincidan con la búsqueda.');
  }
  this.filteredPublications = data.map(pub => ({
    ...pub,
    userProfileImage: this.authService.getUserProfileImage(pub.user_name),
    userName: pub.user_name || 'Usuario desconocido',
    section: pub.section || 'Sin sección',
    title: pub.title
  }));
},

    error: (err) => {
      console.error('Error al buscar publicaciones:', err);
      this.filteredPublications = [];
    }
  });
}




  



abrirListaReportes() {
  this.reportes = JSON.parse(localStorage.getItem('reportes') || '[]');
  this.mostrarListaReportes = !this.mostrarListaReportes;

  if (this.mostrarListaReportes) {
    this.hayNuevosReportes = false;
    localStorage.setItem('nuevosReportes', 'false');
  }
}

eliminarReporte(index: number) {
  this.reportes.splice(index, 1);
  localStorage.setItem('reportes', JSON.stringify(this.reportes));

  // Forzar que la lista siga abierta:
  this.mostrarListaReportes = true; 
}

goToMarsWeather(): void {
  this.router.navigate(['/nasa-weather']);
}

goToVideogame(): void {
  this.router.navigate(['/juegos-nave']);
}

goToPublication(publicationId: string): void {
  const element = document.getElementById(`post-${publicationId}`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    console.warn(`No se encontró el post con id: post-${publicationId}`);
  }
}




}

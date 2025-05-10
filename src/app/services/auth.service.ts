import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; 

  private avatarSubject = new BehaviorSubject<string | null>(
    typeof window !== 'undefined' ? this.getAvatar() : null
  );
  avatar$ = this.avatarSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Obtener el perfil del usuario, incluyendo la imagen de perfil
  getUserProfile() {
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      const userProfile = JSON.parse(profile);
      console.log(userProfile); 
      return userProfile; 
    }
    return null;
  }

  // Obtener avatar desde localStorage
  getAvatar(): string | null {
    const avatar = localStorage.getItem('userAvatar');
    console.log('Avatar recuperado del localStorage:', avatar); 
    return avatar;
  }

  // Guardar el perfil de usuario en el localStorage
  setUserProfile(profile: any) {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }

  // Guardar solo el nombre de usuario en localStorage
  setUsername(username: string): void {
    localStorage.setItem('username', username);
  }

  // Obtener nombre de usuario desde localStorage
  getUsername(): string | null {
    return localStorage.getItem('username'); 
  }
  

  // Guardar avatar en localStorage
  setAvatar(avatarUrl: string): void {
    localStorage.setItem('userAvatar', avatarUrl);
    this.avatarSubject.next(avatarUrl); 
  }

  // Obtener la imagen del perfil de un usuario
  getUserProfileImage(userName: string): string | null {
    const userProfile = localStorage.getItem(`profile_${userName}`);
    if (userProfile) {
      const profile = JSON.parse(userProfile);
      return profile.uploadedCircleImage;
    }
    return '/assets/images/avatar1.png'; 
  }


  // Guardar una publicación en localStorage
  savePublication(publicacion: any, section: string) {
    let publicaciones = JSON.parse(localStorage.getItem(section) || '[]');

    const userProfileImage = this.getAvatar();
    const userName = this.getUsername();

    // Crear una nueva publicación con los datos del usuario y la publicación
    publicaciones.push({
      id: publicaciones.length + 1, 
      titulo: publicacion.titulo,
      descripcion: publicacion.descripcion,
      archivo: publicacion.archivo, 
      userProfileImage: userProfileImage, 
      userName: userName, 
      likes: [], 
    });

    // Guardar las publicaciones en localStorage
    localStorage.setItem(section, JSON.stringify(publicaciones));
  }


  
  // Función para cargar publicaciones desde la sección correspondiente
  getPublicationsBySection(section: string) {
    return JSON.parse(localStorage.getItem(section) || '[]');
  }

  // Obtener todas las publicaciones desde localStorage
  getPublications() {
    return JSON.parse(localStorage.getItem('publicaciones') || '[]');
  }

  // Registro de usuario
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

// Login con las credenciales del usuario normal

login(credentials: any, isAdmin: boolean): Observable<any> {
  const loginUrl = `${this.apiUrl}/login`;  // Solo una ruta de login

  return new Observable(observer => {
    this.http.post<any>(loginUrl, credentials, { withCredentials: true }).subscribe(
      (response) => {
        this.setUsername(response.user_name);
        this.setUserProfile(response);
        this.setIsAdmin(response.isAdmin);  

        console.log(response.isAdmin ? '¡Has iniciado sesión como admin!' : 'Has iniciado sesión como usuario normal.');

        observer.next(response);
        observer.complete();
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        observer.error(error);
      }
    );
  });
}






  // Método para verificar si el nombre de usuario ya está disponible
  checkUsernameAvailability(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/check-username/${username}`);
  }

  // Método para verificar si el correo electrónico ya está registrado
  checkEmailAvailability(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/check-email/${email}`);
  }

  // Obtener todos los usuarios
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  // Eliminar un usuario
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }

  // Guardar si es admin
  setIsAdmin(isAdmin: boolean): void {
    localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false');
  }

  // Saber si el usuario logueado es admin
  isAdminUser(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }

  // auth.service.ts
getIsAdmin(): boolean {
  return JSON.parse(localStorage.getItem('isAdmin') || 'false');
}

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // URL de la API

  private avatarSubject = new BehaviorSubject<string | null>(this.getAvatar()); // Emite el avatar inicial desde localStorage
  avatar$ = this.avatarSubject.asObservable(); // Observable para escuchar cambios en el avatar

  constructor(private http: HttpClient) {}

  // Obtener el perfil de usuario del localStorage
  getUserProfile() {
    const profile = localStorage.getItem('userProfile');
    return profile ? JSON.parse(profile) : null;
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

  // Obtener avatar desde localStorage
  getAvatar(): string | null {
    return localStorage.getItem('userAvatar');
  }

  // Guardar avatar en localStorage
  setAvatar(avatarUrl: string): void {
    localStorage.setItem('userAvatar', avatarUrl);
    this.avatarSubject.next(avatarUrl); // Emitir el nuevo avatar
  }

  // Registro de usuario
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Inicio de sesión
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Método para verificar si el nombre de usuario ya está disponible
  checkUsernameAvailability(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/check-username/${username}`);
  }

  // Método para verificar si el correo electrónico ya está registrado
  checkEmailAvailability(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/check-email/${email}`);
  }
}

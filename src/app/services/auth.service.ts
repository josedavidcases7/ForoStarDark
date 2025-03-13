import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // URL de la API

  constructor(private http: HttpClient) {}

  // Guardar perfil en localStorage
  setUserProfile(data: any): void {
    localStorage.setItem('userProfile', JSON.stringify(data));
  }

  // Obtener perfil desde localStorage
  getUserProfile(): any {
    const storedUser = localStorage.getItem('userProfile');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  // Guardar solo el nombre de usuario en localStorage
  setUsername(username: string): void {
    localStorage.setItem('username', username);
  }

  // Obtener nombre de usuario desde localStorage
  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  // Registro de usuario
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Inicio de sesión
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}

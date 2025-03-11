import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',  // Asegúrate de que el servicio esté disponible globalmente
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';  // Cambia la URL si es necesario

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);  // Aquí haces la llamada al backend
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}

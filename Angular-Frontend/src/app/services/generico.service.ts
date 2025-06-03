// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericoService {
  private urlBase = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  obtener<T>(ruta: string, parametros?: any): Observable<T> {
    return this.http.get<T>(`${this.urlBase}/${ruta}`, { params: parametros });
  }

  crear<T>(ruta: string, cuerpo: any): Observable<T> {
    return this.http.post<T>(`${this.urlBase}/${ruta}`, cuerpo, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  actualizar<T>(ruta: string, cuerpo: any): Observable<T> {
    return this.http.put<T>(`${this.urlBase}/${ruta}`, cuerpo, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  eliminar<T>(ruta: string): Observable<T> {
    return this.http.delete<T>(`${this.urlBase}/${ruta}`, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }
}

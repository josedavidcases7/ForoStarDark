import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NasaWeather } from './nasa-weather';

@Injectable({
  providedIn: 'root'
})
export class NasaService {
private apiUrl = 'https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0';

  constructor(private http: HttpClient) {}

  getWeather(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }



}

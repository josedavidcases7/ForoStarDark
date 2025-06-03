import { NgForOf, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';

interface SolData {
  AT?: { mn: number; mx: number };
  PRE?: { av: number };
}

interface WeatherData {
  sol_keys: string[];
  [sol: string]: SolData | string[];
}


@Component({
  selector: 'app-nasa-weather',
  imports: [NgIf, NgForOf],
  templateUrl: './nasa-weather.component.html',
  styleUrl: './nasa-weather.component.scss'
})

export class NasaWeatherComponent implements OnInit {
  weatherData = signal<WeatherData | null>(null);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    fetch(
      'https://api.nasa.gov/insight_weather/?api_key=413oZMAbztY7IHdoViivec6Tkb5siGfcx0ia4Sew&feedtype=json&ver=1.0'
    )
      .then((res) => res.json())
      .then((data) => {
        this.weatherData.set(data);
        this.isLoading.set(false);
      })
      .catch(() => {
        this.error.set('Error al obtener datos');
        this.isLoading.set(false);
      });
  }
  getSolData(sol: string): SolData | null {
  const data = this.weatherData();
  if (data && typeof data[sol] === 'object' && !Array.isArray(data[sol])) {
    return data[sol] as SolData;
  }
  return null;
}

}

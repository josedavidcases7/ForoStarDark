import { Component, OnInit } from '@angular/core';
import { NasaWeather, SolData } from '../nasa-weather';
import { NasaService } from '../nasa.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-meteorologia-marte',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './meteorologia-marte.component.html',
  styleUrl: './meteorologia-marte.component.scss'
})
export class MeteorologiaMarteComponent implements OnInit {
   weatherData!: NasaWeather;

  constructor(private nasaService: NasaService) {}

  ngOnInit(): void {
    this.nasaService.getWeather().subscribe({
      next: (data) => {
        this.weatherData = data;
        console.log('Respuesta:', data); 
      },
      error: (error) => {
        console.error('Error al obtener datos:', error); 
      }
    });
  }

  getTemperatura(sol: string): string {
    const solData = this.weatherData[sol] as SolData;
    return solData.AT?.av !== undefined ? `${solData.AT.av} °C` : 'N/A';
  }

  getTempMax(sol: string): string {
    const solData = this.weatherData[sol] as SolData;
    return solData.AT?.mx !== undefined ? `${solData.AT.mx} °C` : 'N/A';
  }

  getTempMin(sol: string): string {
    const solData = this.weatherData[sol] as SolData;
    return solData.AT?.mn !== undefined ? `${solData.AT.mn} °C` : 'N/A';
  }

}

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './perfil/perfil.component';
import { AgujerosNegrosComponent } from './agujeros-negros/agujeros-negros.component';
import { UniversosComponent } from './universos/universos.component';
import { PlanetasYEstrellasComponent } from './planetas-y-estrellas/planetas-y-estrellas.component';
import { GalaxiasComponent } from './galaxias/galaxias.component';
import { SatelitesComponent } from './satelites/satelites.component';
import { VidaExtraterrestreComponent } from './vida-extraterrestre/vida-extraterrestre.component';
import { TeoriasComponent } from './teorias/teorias.component';
import { SubirPublicacionComponent } from './subir-publicacion/subir-publicacion.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },  // Página principal
  { path: 'perfil', component: ProfileComponent },  // Página de perfil
  { path: 'agujeros-negros', component: AgujerosNegrosComponent },  // Página Agujeros Negros
  { path: 'universos', component: UniversosComponent },  // Página Universos
  { path: 'planetas-y-estrellas', component: PlanetasYEstrellasComponent },  // Página Planetas y Estrellas
  { path: 'galaxias', component: GalaxiasComponent },  // Página Galaxias
  { path: 'satelites', component: SatelitesComponent },  // Página Satélites
  { path: 'vida-extraterrestre', component: VidaExtraterrestreComponent },  // Página Vida Extraterrestre
  { path: 'teorias', component: TeoriasComponent },  // Página Teorías
  { path: 'subir-publicacion', component: SubirPublicacionComponent },  // Página para añadir publicación
];

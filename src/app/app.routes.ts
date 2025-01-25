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
import { SeleccionDebateComponent } from './seleccion-debate/seleccion-debate.component';

import { SubirPublicacionComponent } from './subir-publicacion/subir-publicacion.component';
import { SubirPublicacionAgujerosNegrosComponent } from './subir-publicacion-agujeros-negros/subir-publicacion-agujeros-negros.component';
import { SubirPublicacionGalaxiasComponent } from './subir-publicacion-galaxias/subir-publicacion-galaxias.component';
import { SubirPublicacionPlanetasYEstrellasComponent } from './subir-publicacion-planetas-y-estrellas/subir-publicacion-planetas-y-estrellas.component';
import { SubirPublicacionSatelitesComponent } from './subir-publicacion-satelites/subir-publicacion-satelites.component';
import { SubirPublicacionTeoriasComponent } from './subir-publicacion-teorias/subir-publicacion-teorias.component';
import { SubirPublicacionUniversosComponent } from './subir-publicacion-universos/subir-publicacion-universos.component';
import { SubirPublicacionVidaExtraterrestreComponent } from './subir-publicacion-vida-extraterrestre/subir-publicacion-vida-extraterrestre.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },  // Página principal
  { path: 'perfil', component: ProfileComponent },  // Página de perfil
  { path: 'subir-publicacion', component: SubirPublicacionComponent },  // Página de perfil
  { path: 'agujeros-negros', component: AgujerosNegrosComponent },  // Página Agujeros Negros
  { path: 'universos', component: UniversosComponent },  // Página Universos
  { path: 'planetas-y-estrellas', component: PlanetasYEstrellasComponent },  // Página Planetas y Estrellas
  { path: 'galaxias', component: GalaxiasComponent },  // Página Galaxias
  { path: 'satelites', component: SatelitesComponent },  // Página Satélites
  { path: 'vida-extraterrestre', component: VidaExtraterrestreComponent },  // Página Vida Extraterrestre
  { path: 'teorias', component: TeoriasComponent },  // Página Teorías
  { path: 'subir-publicacion-agujeros-negros', component: SubirPublicacionAgujerosNegrosComponent },  // Ruta nueva para Agujeros Negros
  { path: 'subir-publicacion-galaxias', component: SubirPublicacionGalaxiasComponent },
  { path: 'subir-publicacion-planetas-y-estrellas', component: SubirPublicacionPlanetasYEstrellasComponent },
  { path: 'subir-publicacion-satelites', component: SubirPublicacionSatelitesComponent },
  { path: 'subir-publicacion-teorias', component: SubirPublicacionTeoriasComponent },
  { path: 'subir-publicacion-universos', component: SubirPublicacionUniversosComponent },
  { path: 'subir-publicacion-vida-extraterrestre', component: SubirPublicacionVidaExtraterrestreComponent },
  { path: 'seleccion-debate', component: SeleccionDebateComponent },

];

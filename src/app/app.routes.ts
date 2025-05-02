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
import { ComentariosComponent } from './comentarios/comentarios.component';
import { SubirPublicacionComponent } from './subir-publicacion/subir-publicacion.component';
import { SubirPublicacionAgujerosNegrosComponent } from './subir-publicacion-agujeros-negros/subir-publicacion-agujeros-negros.component';
import { SubirPublicacionGalaxiasComponent } from './subir-publicacion-galaxias/subir-publicacion-galaxias.component';
import { SubirPublicacionPlanetasYEstrellasComponent } from './subir-publicacion-planetas-y-estrellas/subir-publicacion-planetas-y-estrellas.component';
import { SubirPublicacionSatelitesComponent } from './subir-publicacion-satelites/subir-publicacion-satelites.component';
import { SubirPublicacionTeoriasComponent } from './subir-publicacion-teorias/subir-publicacion-teorias.component';
import { SubirPublicacionUniversosComponent } from './subir-publicacion-universos/subir-publicacion-universos.component';
import { SubirPublicacionVidaExtraterrestreComponent } from './subir-publicacion-vida-extraterrestre/subir-publicacion-vida-extraterrestre.component';
import { FinEventoComponent } from './fin-evento/fin-evento.component';
import { ActualizacionesPageComponent } from './actualizaciones-page/actualizaciones-page.component';

import { AdminCrearEventoComponent } from './admin-crear-evento/admin-crear-evento.component';
import { AdminListaUsuariosComponent } from './admin-lista-usuarios/admin-lista-usuarios.component';

import { LoginPcComponent } from './login-pc/login-pc.component';
import { LoginElectionPcComponent } from './login-election-pc/login-election-pc.component';
import { RegisterElectionPcComponent } from './register-election-pc/register-election-pc.component';

export const routes: Routes = [
  { path: '', component: LoginPcComponent },  
  { path: 'home', component: HomeComponent }, 
  { path: 'perfil', component: ProfileComponent },  
  { path: 'subir-publicacion', component: SubirPublicacionComponent },  
  { path: 'agujeros-negros', component: AgujerosNegrosComponent },  
  { path: 'universos', component: UniversosComponent },  
  { path: 'planetas-y-estrellas', component: PlanetasYEstrellasComponent },  
  { path: 'galaxias', component: GalaxiasComponent },  
  { path: 'satelites', component: SatelitesComponent },  
  { path: 'vida-extraterrestre', component: VidaExtraterrestreComponent },  
  { path: 'teorias', component: TeoriasComponent },  
  { path: 'subir-publicacion-agujeros-negros', component: SubirPublicacionAgujerosNegrosComponent },  
  { path: 'subir-publicacion-galaxias', component: SubirPublicacionGalaxiasComponent },
  { path: 'subir-publicacion-planetas-y-estrellas', component: SubirPublicacionPlanetasYEstrellasComponent },
  { path: 'subir-publicacion-satelites', component: SubirPublicacionSatelitesComponent },
  { path: 'subir-publicacion-teorias', component: SubirPublicacionTeoriasComponent },
  { path: 'subir-publicacion-universos', component: SubirPublicacionUniversosComponent },
  { path: 'subir-publicacion-vida-extraterrestre', component: SubirPublicacionVidaExtraterrestreComponent },
  { path: 'seleccion-debate', component: SeleccionDebateComponent },
  { path: 'fin-debate', component: FinEventoComponent },
  { path: 'admin-crear-evento', component: AdminCrearEventoComponent },
  { path: 'admin-lista-usuarios', component: AdminListaUsuariosComponent },
  { path: 'register', component: RegisterElectionPcComponent },
  { path: 'login', component: LoginElectionPcComponent},
  { path: 'actualizaciones-page', component: ActualizacionesPageComponent}


  
];

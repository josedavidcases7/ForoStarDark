// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';  // Importa RouterModule
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';  // Importa el ChatComponent
import { ProfileComponent } from './perfil/perfil.component';  // Importa ProfileComponent
import { routes } from './app.routes';  // Importa las rutas definidas
import { MeteorologiaMarteComponent } from './meteorologia-marte/meteorologia-marte.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NasaService } from './nasa.service';


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ProfileComponent,
    MeteorologiaMarteComponent,
    HttpClient
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ChatComponent,
    AppComponent,
    ProfileComponent
  ],
  providers: [NasaService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MeteorologiaMarteComponent } from './meteorologia-marte/meteorologia-marte.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NasaService } from './nasa.service';import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ProfileComponent } from './perfil/perfil.component';
import { routes } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
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
  bootstrap: [AppComponent],
})
export class AppModule { }
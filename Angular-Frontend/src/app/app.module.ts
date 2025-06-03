// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ProfileComponent } from './perfil/perfil.component';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ChatComponent,
    AppComponent,
    ProfileComponent
  ],
  providers: [],
})
export class AppModule { }
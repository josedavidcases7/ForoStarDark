// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';  // Importa RouterModule
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';  // Importa el ChatComponent
import { ProfileComponent } from './perfil/perfil.component';  // Importa ProfileComponent
import { routes } from './app.routes';  // Importa las rutas definidas

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,  // Asegúrate de que ChatComponent esté declarado aquí
    ProfileComponent  // Asegúrate de que ProfileComponent esté declarado aquí
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)  // Agrega RouterModule con las rutas
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

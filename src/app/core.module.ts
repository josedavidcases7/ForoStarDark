import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule

@NgModule({
  imports: [HttpClientModule],  // Importar HttpClientModule para que esté disponible globalmente
  exports: [HttpClientModule],  // Exportarlo para que esté disponible en cualquier otro componente autónomo
})
export class CoreModule {}

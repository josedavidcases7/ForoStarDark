import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirPublicacionPlanetasYEstrellasComponent } from './subir-publicacion-planetas-y-estrellas.component';

describe('SubirPublicacionPlanetasYEstrellasComponent', () => {
  let component: SubirPublicacionPlanetasYEstrellasComponent;
  let fixture: ComponentFixture<SubirPublicacionPlanetasYEstrellasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubirPublicacionPlanetasYEstrellasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirPublicacionPlanetasYEstrellasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

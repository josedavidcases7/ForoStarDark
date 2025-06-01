import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionesPlanetasEstrellasComponent } from './publicaciones-planetas-estrellas.component';

describe('PublicacionesPlanetasEstrellasComponent', () => {
  let component: PublicacionesPlanetasEstrellasComponent;
  let fixture: ComponentFixture<PublicacionesPlanetasEstrellasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicacionesPlanetasEstrellasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicacionesPlanetasEstrellasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

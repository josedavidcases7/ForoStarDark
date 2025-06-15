import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirPublicacionGalaxiasComponent } from './subir-publicacion-galaxias.component';

describe('SubirPublicacionGalaxiasComponent', () => {
  let component: SubirPublicacionGalaxiasComponent;
  let fixture: ComponentFixture<SubirPublicacionGalaxiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubirPublicacionGalaxiasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirPublicacionGalaxiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

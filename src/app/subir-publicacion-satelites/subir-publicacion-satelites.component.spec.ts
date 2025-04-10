import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirPublicacionSatelitesComponent } from './subir-publicacion-satelites.component';

describe('SubirPublicacionSatelitesComponent', () => {
  let component: SubirPublicacionSatelitesComponent;
  let fixture: ComponentFixture<SubirPublicacionSatelitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubirPublicacionSatelitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirPublicacionSatelitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

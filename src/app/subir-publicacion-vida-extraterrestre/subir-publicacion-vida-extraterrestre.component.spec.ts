import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirPublicacionVidaExtraterrestreComponent } from './subir-publicacion-vida-extraterrestre.component';

describe('SubirPublicacionVidaExtraterrestreComponent', () => {
  let component: SubirPublicacionVidaExtraterrestreComponent;
  let fixture: ComponentFixture<SubirPublicacionVidaExtraterrestreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubirPublicacionVidaExtraterrestreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirPublicacionVidaExtraterrestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

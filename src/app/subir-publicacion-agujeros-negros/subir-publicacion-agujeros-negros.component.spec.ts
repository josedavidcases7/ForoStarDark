import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirPublicacionAgujerosNegrosComponent } from './subir-publicacion-agujeros-negros.component';

describe('SubirPublicacionAgujerosNegrosComponent', () => {
  let component: SubirPublicacionAgujerosNegrosComponent;
  let fixture: ComponentFixture<SubirPublicacionAgujerosNegrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubirPublicacionAgujerosNegrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirPublicacionAgujerosNegrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

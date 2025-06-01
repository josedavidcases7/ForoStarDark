import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirPublicacionUniversosComponent } from './subir-publicacion-universos.component';

describe('SubirPublicacionUniversosComponent', () => {
  let component: SubirPublicacionUniversosComponent;
  let fixture: ComponentFixture<SubirPublicacionUniversosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubirPublicacionUniversosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirPublicacionUniversosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

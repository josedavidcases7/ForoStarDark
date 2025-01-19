import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirPublicacionComponent } from './subir-publicacion.component';

describe('SubirPublicacionComponent', () => {
  let component: SubirPublicacionComponent;
  let fixture: ComponentFixture<SubirPublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubirPublicacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

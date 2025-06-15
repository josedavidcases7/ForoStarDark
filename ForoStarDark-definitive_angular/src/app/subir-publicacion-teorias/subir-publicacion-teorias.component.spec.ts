import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirPublicacionTeoriasComponent } from './subir-publicacion-teorias.component';

describe('SubirPublicacionTeoriasComponent', () => {
  let component: SubirPublicacionTeoriasComponent;
  let fixture: ComponentFixture<SubirPublicacionTeoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubirPublicacionTeoriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirPublicacionTeoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

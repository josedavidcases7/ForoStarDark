import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionesTeoriasComponent } from './publicaciones-teorias.component';

describe('PublicacionesTeoriasComponent', () => {
  let component: PublicacionesTeoriasComponent;
  let fixture: ComponentFixture<PublicacionesTeoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicacionesTeoriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicacionesTeoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

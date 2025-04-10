import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionesGalaxiasComponent } from './publicaciones-galaxias.component';

describe('PublicacionesGalaxiasComponent', () => {
  let component: PublicacionesGalaxiasComponent;
  let fixture: ComponentFixture<PublicacionesGalaxiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicacionesGalaxiasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicacionesGalaxiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

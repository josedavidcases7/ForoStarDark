import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetasYEstrellasComponent } from './planetas-y-estrellas.component';

describe('PlanetasYEstrellasComponent', () => {
  let component: PlanetasYEstrellasComponent;
  let fixture: ComponentFixture<PlanetasYEstrellasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanetasYEstrellasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanetasYEstrellasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

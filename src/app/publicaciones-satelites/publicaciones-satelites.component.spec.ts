import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionesSatelitesComponent } from './publicaciones-satelites.component';

describe('PublicacionesSatelitesComponent', () => {
  let component: PublicacionesSatelitesComponent;
  let fixture: ComponentFixture<PublicacionesSatelitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicacionesSatelitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicacionesSatelitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

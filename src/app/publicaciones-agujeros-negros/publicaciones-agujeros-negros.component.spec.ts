import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionesAgujerosNegrosComponent } from './publicaciones-agujeros-negros.component';

describe('PublicacionesAgujerosNegrosComponent', () => {
  let component: PublicacionesAgujerosNegrosComponent;
  let fixture: ComponentFixture<PublicacionesAgujerosNegrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicacionesAgujerosNegrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicacionesAgujerosNegrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

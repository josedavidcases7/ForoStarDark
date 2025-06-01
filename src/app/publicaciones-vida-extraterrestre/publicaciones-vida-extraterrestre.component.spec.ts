import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionesVidaExtraterrestreComponent } from './publicaciones-vida-extraterrestre.component';

describe('PublicacionesVidaExtraterrestreComponent', () => {
  let component: PublicacionesVidaExtraterrestreComponent;
  let fixture: ComponentFixture<PublicacionesVidaExtraterrestreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicacionesVidaExtraterrestreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicacionesVidaExtraterrestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

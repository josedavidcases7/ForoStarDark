import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionesUniversosComponent } from './publicaciones-universos.component';

describe('PublicacionesUniversosComponent', () => {
  let component: PublicacionesUniversosComponent;
  let fixture: ComponentFixture<PublicacionesUniversosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicacionesUniversosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicacionesUniversosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

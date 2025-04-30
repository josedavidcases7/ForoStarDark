import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionesPageComponent } from './actualizaciones-page.component';

describe('ActualizacionesPageComponent', () => {
  let component: ActualizacionesPageComponent;
  let fixture: ComponentFixture<ActualizacionesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizacionesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizacionesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

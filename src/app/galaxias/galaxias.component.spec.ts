import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalaxiasComponent } from './galaxias.component';

describe('GalaxiasComponent', () => {
  let component: GalaxiasComponent;
  let fixture: ComponentFixture<GalaxiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalaxiasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalaxiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

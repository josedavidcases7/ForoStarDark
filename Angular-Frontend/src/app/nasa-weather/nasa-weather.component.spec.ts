import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NasaWeatherComponent } from './nasa-weather.component';

describe('NasaWeatherComponent', () => {
  let component: NasaWeatherComponent;
  let fixture: ComponentFixture<NasaWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NasaWeatherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NasaWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

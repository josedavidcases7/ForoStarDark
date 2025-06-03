import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteorologiaMarteComponent } from './meteorologia-marte.component';

describe('MeteorologiaMarteComponent', () => {
  let component: MeteorologiaMarteComponent;
  let fixture: ComponentFixture<MeteorologiaMarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeteorologiaMarteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeteorologiaMarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

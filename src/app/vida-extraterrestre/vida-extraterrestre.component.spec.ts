import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VidaExtraterrestreComponent } from './vida-extraterrestre.component';

describe('VidaExtraterrestreComponent', () => {
  let component: VidaExtraterrestreComponent;
  let fixture: ComponentFixture<VidaExtraterrestreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VidaExtraterrestreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VidaExtraterrestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

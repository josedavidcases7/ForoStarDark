import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgujerosNegrosComponent } from './agujeros-negros.component';

describe('AgujerosNegrosComponent', () => {
  let component: AgujerosNegrosComponent;
  let fixture: ComponentFixture<AgujerosNegrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgujerosNegrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgujerosNegrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

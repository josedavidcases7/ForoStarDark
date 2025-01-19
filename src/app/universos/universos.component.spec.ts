import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversosComponent } from './universos.component';

describe('UniversosComponent', () => {
  let component: UniversosComponent;
  let fixture: ComponentFixture<UniversosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

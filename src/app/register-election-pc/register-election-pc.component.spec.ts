import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterElectionPcComponent } from './register-election-pc.component';

describe('RegisterElectionPcComponent', () => {
  let component: RegisterElectionPcComponent;
  let fixture: ComponentFixture<RegisterElectionPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterElectionPcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterElectionPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

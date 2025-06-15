import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginElectionPcComponent } from './login-election-pc.component';

describe('LoginElectionPcComponent', () => {
  let component: LoginElectionPcComponent;
  let fixture: ComponentFixture<LoginElectionPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginElectionPcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginElectionPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

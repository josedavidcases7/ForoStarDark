import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPcComponent } from './login-pc.component';

describe('LoginPcComponent', () => {
  let component: LoginPcComponent;
  let fixture: ComponentFixture<LoginPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

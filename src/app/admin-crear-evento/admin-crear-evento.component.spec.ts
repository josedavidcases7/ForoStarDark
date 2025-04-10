import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCrearEventoComponent } from './admin-crear-evento.component';

describe('AdminCrearEventoComponent', () => {
  let component: AdminCrearEventoComponent;
  let fixture: ComponentFixture<AdminCrearEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCrearEventoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCrearEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

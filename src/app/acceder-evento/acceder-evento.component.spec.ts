import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccederEventoComponent } from './acceder-evento.component';

describe('AccederEventoComponent', () => {
  let component: AccederEventoComponent;
  let fixture: ComponentFixture<AccederEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccederEventoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccederEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionDebateComponent } from './seleccion-debate.component';

describe('SeleccionDebateComponent', () => {
  let component: SeleccionDebateComponent;
  let fixture: ComponentFixture<SeleccionDebateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionDebateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionDebateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

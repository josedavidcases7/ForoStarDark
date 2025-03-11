import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinEventoComponent } from './fin-evento.component';

describe('FinEventoComponent', () => {
  let component: FinEventoComponent;
  let fixture: ComponentFixture<FinEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinEventoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoNavesComponent } from './juego-naves.component';

describe('JuegoNavesComponent', () => {
  let component: JuegoNavesComponent;
  let fixture: ComponentFixture<JuegoNavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegoNavesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegoNavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

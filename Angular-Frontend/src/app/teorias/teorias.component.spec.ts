import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeoriasComponent } from './teorias.component';

describe('TeoriasComponent', () => {
  let component: TeoriasComponent;
  let fixture: ComponentFixture<TeoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeoriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

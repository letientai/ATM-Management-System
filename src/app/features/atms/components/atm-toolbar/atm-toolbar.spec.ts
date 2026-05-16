import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmToolbar } from './atm-toolbar';

describe('AtmToolbar', () => {
  let component: AtmToolbar;
  let fixture: ComponentFixture<AtmToolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtmToolbar],
    }).compileComponents();

    fixture = TestBed.createComponent(AtmToolbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

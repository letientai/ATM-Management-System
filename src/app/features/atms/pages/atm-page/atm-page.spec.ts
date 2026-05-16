import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmPage } from './atm-page';

describe('AtmPage', () => {
  let component: AtmPage;
  let fixture: ComponentFixture<AtmPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtmPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AtmPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

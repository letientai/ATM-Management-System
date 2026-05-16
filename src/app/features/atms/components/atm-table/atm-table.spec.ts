import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmTable } from './atm-table';

describe('AtmTable', () => {
  let component: AtmTable;
  let fixture: ComponentFixture<AtmTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtmTable],
    }).compileComponents();

    fixture = TestBed.createComponent(AtmTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

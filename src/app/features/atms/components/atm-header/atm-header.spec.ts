import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmHeader } from './atm-header';

describe('AtmHeader', () => {
  let component: AtmHeader;
  let fixture: ComponentFixture<AtmHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtmHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(AtmHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

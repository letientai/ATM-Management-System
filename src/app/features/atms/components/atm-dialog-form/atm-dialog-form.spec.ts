import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmDialogForm } from './atm-dialog-form';

describe('AtmDialogForm', () => {
  let component: AtmDialogForm;
  let fixture: ComponentFixture<AtmDialogForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtmDialogForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AtmDialogForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

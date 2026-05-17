import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDeleteDialog } from './common-delete-dialog';

describe('CommonDeleteDialog', () => {
  let component: CommonDeleteDialog;
  let fixture: ComponentFixture<CommonDeleteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonDeleteDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonDeleteDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

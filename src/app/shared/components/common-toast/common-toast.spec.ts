import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonToast } from './common-toast';

describe('CommonToast', () => {
  let component: CommonToast;
  let fixture: ComponentFixture<CommonToast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonToast],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonToast);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PteRegistrationSelectionComponent } from './pte-registration-selection.component';

describe('PteRegistrationSelectionComponent', () => {
  let component: PteRegistrationSelectionComponent;
  let fixture: ComponentFixture<PteRegistrationSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PteRegistrationSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PteRegistrationSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

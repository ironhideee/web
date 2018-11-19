import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalCheckoutComponent } from './legal-checkout.component';

describe('LegalCheckoutComponent', () => {
  let component: LegalCheckoutComponent;
  let fixture: ComponentFixture<LegalCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

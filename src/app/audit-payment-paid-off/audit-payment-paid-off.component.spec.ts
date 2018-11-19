import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditPaymentPaidOffComponent } from './audit-payment-paid-off.component';

describe('AuditPaymentPaidOffComponent', () => {
  let component: AuditPaymentPaidOffComponent;
  let fixture: ComponentFixture<AuditPaymentPaidOffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditPaymentPaidOffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditPaymentPaidOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

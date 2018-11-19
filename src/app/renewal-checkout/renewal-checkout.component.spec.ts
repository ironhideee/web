import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalCheckoutComponent } from './renewal-checkout.component';

describe('RenewalCheckoutComponent', () => {
  let component: RenewalCheckoutComponent;
  let fixture: ComponentFixture<RenewalCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

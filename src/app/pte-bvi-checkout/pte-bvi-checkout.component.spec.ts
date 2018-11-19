import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PteBviCheckoutComponent } from './pte-bvi-checkout.component';

describe('PteBviCheckoutComponent', () => {
  let component: PteBviCheckoutComponent;
  let fixture: ComponentFixture<PteBviCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PteBviCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PteBviCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

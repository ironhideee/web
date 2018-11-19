import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PteSgCheckoutComponent } from './pte-sg-checkout.component';

describe('PteSgCheckoutComponent', () => {
  let component: PteSgCheckoutComponent;
  let fixture: ComponentFixture<PteSgCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PteSgCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PteSgCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

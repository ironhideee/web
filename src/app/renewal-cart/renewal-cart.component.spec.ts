import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalCartComponent } from './renewal-cart.component';

describe('RenewalCartComponent', () => {
  let component: RenewalCartComponent;
  let fixture: ComponentFixture<RenewalCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalCartComponent } from './legal-cart.component';

describe('LegalCartComponent', () => {
  let component: LegalCartComponent;
  let fixture: ComponentFixture<LegalCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

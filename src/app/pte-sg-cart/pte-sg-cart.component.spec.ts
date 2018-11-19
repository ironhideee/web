import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PteSgCartComponent } from './pte-sg-cart.component';

describe('PteSgCartComponent', () => {
  let component: PteSgCartComponent;
  let fixture: ComponentFixture<PteSgCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PteSgCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PteSgCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

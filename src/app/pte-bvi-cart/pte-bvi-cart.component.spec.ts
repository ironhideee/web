import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PteBviCartComponent } from './pte-bvi-cart.component';

describe('PteBviCartComponent', () => {
  let component: PteBviCartComponent;
  let fixture: ComponentFixture<PteBviCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PteBviCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PteBviCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

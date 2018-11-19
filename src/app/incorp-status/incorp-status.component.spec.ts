import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncorpStatusComponent } from './incorp-status.component';

describe('IncorpStatusComponent', () => {
  let component: IncorpStatusComponent;
  let fixture: ComponentFixture<IncorpStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncorpStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncorpStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

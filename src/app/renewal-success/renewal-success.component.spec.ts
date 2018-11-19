import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalSuccessComponent } from './renewal-success.component';

describe('RenewalSuccessComponent', () => {
  let component: RenewalSuccessComponent;
  let fixture: ComponentFixture<RenewalSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

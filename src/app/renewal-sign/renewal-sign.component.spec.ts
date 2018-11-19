import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalSignComponent } from './renewal-sign.component';

describe('RenewalSignComponent', () => {
  let component: RenewalSignComponent;
  let fixture: ComponentFixture<RenewalSignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalSignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

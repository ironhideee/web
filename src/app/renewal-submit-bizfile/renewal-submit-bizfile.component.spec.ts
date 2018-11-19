import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalSubmitBizfileComponent } from './renewal-submit-bizfile.component';

describe('RenewalSubmitBizfileComponent', () => {
  let component: RenewalSubmitBizfileComponent;
  let fixture: ComponentFixture<RenewalSubmitBizfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalSubmitBizfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalSubmitBizfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

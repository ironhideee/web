import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalKycComponent } from './legal-kyc.component';

describe('LegalKycComponent', () => {
  let component: LegalKycComponent;
  let fixture: ComponentFixture<LegalKycComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalKycComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

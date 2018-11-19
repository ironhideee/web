import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalSuccessComponent } from './legal-success.component';

describe('LegalSuccessComponent', () => {
  let component: LegalSuccessComponent;
  let fixture: ComponentFixture<LegalSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

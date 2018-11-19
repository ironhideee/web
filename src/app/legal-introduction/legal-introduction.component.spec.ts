import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalIntroductionComponent } from './legal-introduction.component';

describe('LegalIntroductionComponent', () => {
  let component: LegalIntroductionComponent;
  let fixture: ComponentFixture<LegalIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalIntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

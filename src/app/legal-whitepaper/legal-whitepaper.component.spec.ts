import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalWhitepaperComponent } from './legal-whitepaper.component';

describe('LegalWhitepaperComponent', () => {
  let component: LegalWhitepaperComponent;
  let fixture: ComponentFixture<LegalWhitepaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalWhitepaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalWhitepaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

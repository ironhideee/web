import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PteBviIntroductionComponent } from './pte-bvi-introduction.component';

describe('PteBviIntroductionComponent', () => {
  let component: PteBviIntroductionComponent;
  let fixture: ComponentFixture<PteBviIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PteBviIntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PteBviIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

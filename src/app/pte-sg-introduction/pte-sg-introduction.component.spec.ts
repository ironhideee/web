import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PteSgIntroductionComponent } from './pte-sg-introduction.component';

describe('PteSgIntroductionComponent', () => {
  let component: PteSgIntroductionComponent;
  let fixture: ComponentFixture<PteSgIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PteSgIntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PteSgIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

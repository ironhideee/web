import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClgIntroductionComponent } from './clg-introduction.component';

describe('ClgIntroductionComponent', () => {
  let component: ClgIntroductionComponent;
  let fixture: ComponentFixture<ClgIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClgIntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClgIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

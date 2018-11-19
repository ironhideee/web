import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalIntroductionComponent } from './renewal-introduction.component';

describe('RenewalIntroductionComponent', () => {
  let component: RenewalIntroductionComponent;
  let fixture: ComponentFixture<RenewalIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalIntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

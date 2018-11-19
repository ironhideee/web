import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PteSgFormsComponent } from './pte-sg-forms.component';

describe('PteSgFormsComponent', () => {
  let component: PteSgFormsComponent;
  let fixture: ComponentFixture<PteSgFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PteSgFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PteSgFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

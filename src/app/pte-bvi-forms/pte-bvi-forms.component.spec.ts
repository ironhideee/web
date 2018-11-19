import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PteBviFormsComponent } from './pte-bvi-forms.component';

describe('PteBviFormsComponent', () => {
  let component: PteBviFormsComponent;
  let fixture: ComponentFixture<PteBviFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PteBviFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PteBviFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

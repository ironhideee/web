import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PteMembersFormsComponent } from './pte-members-forms.component';

describe('PteMembersFormsComponent', () => {
  let component: PteMembersFormsComponent;
  let fixture: ComponentFixture<PteMembersFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PteMembersFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PteMembersFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

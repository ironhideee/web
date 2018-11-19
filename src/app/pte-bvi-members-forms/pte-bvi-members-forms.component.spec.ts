import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PteBviMembersFormsComponent } from './pte-bvi-members-forms.component';

describe('PteBviMembersFormsComponent', () => {
  let component: PteBviMembersFormsComponent;
  let fixture: ComponentFixture<PteBviMembersFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PteBviMembersFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PteBviMembersFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

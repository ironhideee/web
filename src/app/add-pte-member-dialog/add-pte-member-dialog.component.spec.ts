import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPteMemberDialogComponent } from './add-pte-member-dialog.component';

describe('AddPteMemberDialogComponent', () => {
  let component: AddPteMemberDialogComponent;
  let fixture: ComponentFixture<AddPteMemberDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPteMemberDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPteMemberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

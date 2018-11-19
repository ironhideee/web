import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDirectorDialogComponent } from './add-director-dialog.component';

describe('AddDirectorDialogComponent', () => {
  let component: AddDirectorDialogComponent;
  let fixture: ComponentFixture<AddDirectorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDirectorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDirectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

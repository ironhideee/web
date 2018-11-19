import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBviMenberDialogComponent } from './add-bvi-menber-dialog.component';

describe('AddBviMenberDialogComponent', () => {
  let component: AddBviMenberDialogComponent;
  let fixture: ComponentFixture<AddBviMenberDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBviMenberDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBviMenberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

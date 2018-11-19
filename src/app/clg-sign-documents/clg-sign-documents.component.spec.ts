import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClgSignDocumentsComponent } from './clg-sign-documents.component';

describe('ClgSignDocumentsComponent', () => {
  let component: ClgSignDocumentsComponent;
  let fixture: ComponentFixture<ClgSignDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClgSignDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClgSignDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

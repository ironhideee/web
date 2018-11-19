import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditFormsComponent } from './audit-forms.component';

describe('AuditFormsComponent', () => {
  let component: AuditFormsComponent;
  let fixture: ComponentFixture<AuditFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

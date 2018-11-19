import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditCompleteComponent } from './audit-complete.component';

describe('AuditCompleteComponent', () => {
  let component: AuditCompleteComponent;
  let fixture: ComponentFixture<AuditCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

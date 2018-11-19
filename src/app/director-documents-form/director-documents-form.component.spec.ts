import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorDocumentsFormComponent } from './director-documents-form.component';

describe('DirectorDocumentsFormComponent', () => {
  let component: DirectorDocumentsFormComponent;
  let fixture: ComponentFixture<DirectorDocumentsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorDocumentsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorDocumentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

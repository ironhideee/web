import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncorpComponent } from './incorp.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('IncorpComponent', () => {
  let component: IncorpComponent;
  let fixture: ComponentFixture<IncorpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncorpComponent ],
      imports: [
        // Import this module to mock the RouterModule
        // it doesn't require other dependencies.
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncorpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

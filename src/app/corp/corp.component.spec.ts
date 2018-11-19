import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpComponent } from './corp.component';
import { MatStepperModule, MatIconModule, MatFormFieldModule, MatButtonModule, MatHorizontalStepper } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InputFileComponent } from '../input-file/input-file.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CorpComponent', () => {
  let component: CorpComponent;
  let fixture: ComponentFixture<CorpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorpComponent, InputFileComponent ],
      imports: [
        MatStepperModule,
        MatIconModule,
        MatFormFieldModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

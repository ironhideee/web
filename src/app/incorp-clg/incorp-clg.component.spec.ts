import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncorpClgComponent } from './incorp-clg.component';
import { IncorpStepperService } from '../incorp-stepper.service';
import { ExpandOperator } from 'rxjs/operators/expand';
import { RouterTestingModule } from '@angular/router/testing';

describe('IncorpClgComponent', () => {
  let component: IncorpClgComponent;
  let fixture: ComponentFixture<IncorpClgComponent>;

  const stepperService = jasmine.createSpyObj('stepperService', ['setSteps']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncorpClgComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: IncorpStepperService, useValue: stepperService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncorpClgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the stepper on init', () => {
    expect(stepperService.setSteps).toHaveBeenCalled();
  });
});

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IncorpStepperService } from '../incorp-stepper.service';
import { IncorpStep } from '../incorp-step';

@Component({
  selector: 'app-incorp',
  templateUrl: './incorp.component.html',
  styleUrls: ['./incorp.component.sass'],
  providers: [
    IncorpStepperService
  ]
})
export class IncorpComponent implements OnInit, AfterViewInit {

  steps: IncorpStep[] = [];

  constructor(private stepperService: IncorpStepperService) {
  }

  ngOnInit() {
     // Initialize with the steps set from the child component
     this.stepperService
     .stepsUpdated$
     .subscribe((steps) => {
       this.steps = steps;
        // console.log(steps);
     });

  }

  ngAfterViewInit() {
  }

}

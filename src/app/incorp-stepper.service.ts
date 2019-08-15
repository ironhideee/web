import { EventEmitter, Injectable } from '@angular/core';
import { IncorpStep } from './incorp-step';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Deserialize } from 'cerialize';
import 'rxjs/add/operator/do';
import { BaseService } from './base.service';

/**
 * IncorpStepperService is to manage the steps of a specific
 * incorporation process, including the following tasks:
 *  1. store the steps, provides a setter/getter as well as the subscriber
 *  2. manage the current step
 */
@Injectable()
export class IncorpStepperService extends BaseService {

  private _steps: IncorpStep[] = [];

  stepsUpdated$: EventEmitter<IncorpStep[]> = new EventEmitter();

  constructor(
    protected http: HttpClient,
    private router: Router) {
      super(http);
  }

  setSteps(newSteps: IncorpStep[]) {
    this._steps = newSteps;
    /**
     * Boardcast that the steps have been updated.
     */
    this.stepsUpdated$.emit(this._steps);
  }

  steps(): IncorpStep[] {
    return this._steps;
  }

  step(idx: number): IncorpStep {
    return this._steps[idx];
  }

  enablesTo(idx: number) {
    // this._steps
    //   .filter((s) => s.index <= idx)
    //   .forEach((s) => s.enabled = true);
    let current = -1;
    let s;

    do {
      current++;

      s = this._steps[current];
      s.enabled = true;
    } while (current !== idx && idx < this._steps.length - 1);
  }

  enablesToId(id: string) {
    let idx = -1;
    let s;

    do {
      idx++;

      s = this._steps[idx];
      s.enabled = true;
    } while (s.id !== id && idx < this._steps.length - 1);
  }

  /**
   * @param idx the index of the step to go
   */
  nagivateToStep(idx: number) {
    this.enablesTo(idx);
    this.router.navigate([this.step(idx).url]);
    //window.location.reload();
  }

  loadSteps(t: string, orderId: number, setSteps: boolean): Observable<IncorpStep>  {
    const url = `${this.baseUrl}/steps/${t}/${orderId}`;

    return this.http.get(url)
      .map((resp) => Deserialize(resp[t], IncorpStep))
      .do((steps => {
        if (setSteps) {
          this.setSteps(steps);
        }
      }));
  }

}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DataServiceService {
  private stepIndex = new Subject<number>();
  stepIndex$ = this.stepIndex.asObservable();

  setStepIndex(stepNumber) {
    this.stepIndex.next(stepNumber);
  }
}

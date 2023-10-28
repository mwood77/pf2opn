import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  convertFinished$ = new BehaviorSubject(false);

  constructor() { }

  cancel() {
    this.convertFinished$.next(false);
  }

  convert() {
    this.convertFinished$.next(false);
    this.convertFinished$.next(true);

    setTimeout(() => {
      this.convertFinished$.next(true);
      console.log('done');
    }, 5000);
  }
}

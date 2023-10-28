import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  displayConversionCard$ = new BehaviorSubject(false);
  conversionAvailable$ = new BehaviorSubject(false);

  constructor() { }

  cancel() {
    this.displayConversionCard$.next(false);
  }

  async convert(fileName: string, file: File) {
    this.displayConversionCard$.next(false);
    this.displayConversionCard$.next(true);
    
    this.conversionAvailable$.next(false);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.conversionAvailable$.next(true);
        resolve('done');
      }, 5000);
    })
  }
}

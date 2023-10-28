import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ConverterService } from '../services/converter.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {

  displayConversionCard: Boolean;
  conversionAvailable: Boolean;
  progressMode: ProgressBarMode = 'indeterminate';
  progressValue: number = 0;

  fileName = '';
  unsupportedFile = false;

  constructor(private converterService: ConverterService) {
    this.displayConversionCard = this.converterService.displayConversionCard$.getValue();
    this.conversionAvailable = this.converterService.conversionAvailable$.getValue();
  }

  reset(event: any) {
    this.fileName = '';
    event.target.files = null;
    this.unsupportedFile = false;
    this.progressMode = 'indeterminate';
    this.converterService.cancel();
  }

  incrementProgress() {
    this.progressValue = 0;
    for (let i = 0; i <= 100; i++) {
      setTimeout(() => {
        this.progressValue = i;
      }, 250);
    }
  }

  download(event: any) {

  }

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileName = file.name;

    if (file && file.type.match('text/xml')) {
      this.unsupportedFile = false;

      (await this.converterService.convert(file)).subscribe((e: any) => {
        console.log(e);
        this.progressMode = 'determinate';
        this.incrementProgress();
      })

      // if (result) {
      //   this.progressMode = 'determinate';
      //   this.incrementProgress();
      // } else (e: string) => {
      //   console.error('something went boom: ' + e);
      // }
      // .then((result) => {
      //   console.log(result);
      //   this.progressMode = 'determinate';
      //   this.incrementProgress();
      // })
      // .catch((e) => {
      //   console.error('something went boom: ' + e);
      // })

    } else {
      this.unsupportedFile = true;
      this.converterService.cancel();
    }

  }

  ngOnInit() {
    this.converterService.displayConversionCard$.subscribe((e) => {
      this.displayConversionCard = e;
    })
    this.converterService.conversionAvailable$.subscribe((e) => {
      this.conversionAvailable = e;
    })
  }

  ngOnDestroy() {
    this.converterService.displayConversionCard$.unsubscribe();
    this.converterService.conversionAvailable$.unsubscribe();
  }

}

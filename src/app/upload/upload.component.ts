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
  progressColor: string = 'accent';

  fileName = '';
  unsupportedFile = false;
  renderedXML: any = null;
  conversionError = false;

  constructor(private converterService: ConverterService) {
    this.displayConversionCard = this.converterService.displayConversionCard$.getValue();
    this.conversionAvailable = this.converterService.conversionAvailable$.getValue();
  }

  reset(event: any) {
    this.fileName = '';
    event.target.files = null;
    this.unsupportedFile = false;
    this.progressMode = 'indeterminate';
    this.conversionError = false;
    this.progressColor = 'accent';
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


  download() {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.renderedXML));
    element.setAttribute('download', 'pf2opn-generated-opnsense-config.xml');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileName = file.name;
    this.progressColor = 'accent';

    if (file && file.type.match('text/xml')) {
      this.unsupportedFile = false;

      (await this.converterService.convert(file)).subscribe(
        res => {
          this.progressMode = 'determinate';
          this.incrementProgress();
          this.renderedXML = res;
          this.conversionError = false
        },
        err => {
          this.renderedXML = err;
          console.error('something went boom: ' + err);
          this.conversionError = true
          this.progressColor = 'warn';
        },
      );
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ConverterService } from '../converter.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {

  convertFinished: Boolean;
  progressMode: ProgressBarMode = 'indeterminate';

  fileName = '';
  unsupportedFile = false;

  constructor(private converterService: ConverterService) {
    this.convertFinished = this.converterService.convertFinished$.getValue();
  }

  reset(event: any) {
    this.fileName = '';
    event.target.files = null;
    this.unsupportedFile = false;
    this.converterService.cancel();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileName = file.name;

    if (file && file.type.match('text/xml')) {
      this.unsupportedFile = false;

      this.converterService.convert();

      const formData = new FormData();

      formData.append("thumbnail", file);

    } else {
      this.unsupportedFile = true;
      this.converterService.cancel();
    }

  }

  ngOnInit() {
    this.converterService.convertFinished$.subscribe((e) => {
      this.convertFinished = e;
    })
  }

  ngOnDestroy() {
    this.converterService.convertFinished$.unsubscribe();
  }

}

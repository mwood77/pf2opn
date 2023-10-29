import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {

  showInfoCard = true;
  showDonations = false;

  kofiURL = 'https://ko-fi.com/mwood77'
  githubURL = 'https://github.com/sponsors/mwood77'

  openSite(URL: string): void {
    window.open(URL, '_blank');
  }

}

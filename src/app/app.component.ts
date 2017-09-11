import { Component, OnInit} from '@angular/core';
import { Skylink } from 'skylinkjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Skylink';
  config = {
    appKey: '8c00e6a6-b149-443e-a276-2f9351655115',
    defaultRoom: this.getParameterByName('room', null),
    enableDataChannel: true, // Disable this and sendBlobData(), sendP2PMessage() and sendURLData() will NOT work!
    enableIceTrickle: true,
    audioFallback: true,
    forceSSL: true
  };

  ngOnInit() {
      if (this.getParameterByName('room', null) === '') {
        window.location.search = '?room=' + (new Date()).getTime();
      }
      const skylink = new Skylink();

      skylink.init(this.config, function (error, success) {
        if (success) {
          skylink.joinRoom({
            audio: true,
            video: true
          });
        }
      });
  }


getParameterByName(name: string, url: string): string {
      if (!url)  {
        url = window.location.href;
      }
      name = name.replace(/[\[\]]/g, '\\$&');
      const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i'),
          results = regex.exec(url);
      if (!results)  {
        return null;
      }
      if (!results[2]) {
        return '';
      }
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }


}

import { Component, OnInit} from '@angular/core';
import { ViewChild } from '@angular/core';
// import * as sk from 'skylinkjs';
import Skylink from 'skylinkjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('status') statusRef;
  skylink: any;

  ngOnInit() {
      // const title = 'Skylink';
      // const config = {
      //   appKey: '8c00e6a6-b149-443e-a276-2f9351655115',
      //   defaultRoom: this.getParameterByName('room', null),
      //   enableDataChannel: true, // Disable this and sendBlobData(), sendP2PMessage() and sendURLData() will NOT work!
      //   enableIceTrickle: true,
      //   audioFallback: true,
      //   forceSSL: true
      // };
      // if (this.getParameterByName('room', null) === '') {
      //   window.location.search = '?room=' + (new Date()).getTime();
      // }
      const skylink = new Skylink();

      skylink.on('peerJoined', function(peerId, peerInfo, isSelf) {
        if (isSelf) {
          return; // We already have a video element for our video and don't need to create a new one.
        }
        const vid = document.createElement('video');
        vid.autoplay = true;
        vid.muted = true; // Added to avoid feedback when testing locally
        vid.id = peerId;
        document.body.appendChild(vid);
      });

      skylink.on('mediaAccessSuccess', function(stream) {
        const vid = document.getElementById('myvideo');
        attachMediaStream(vid, stream);
      });

      skylink.init({
        apiKey: 'f1773757-5f8b-42dc-b1ef-2374066866f6', // Get your own key at https://console.temasys.io
        defaultRoom: 'GogabE' // getRoomId()
      }, function (error, success) {
        if (error) {
          this.statusRef.innerHTML = 'Failed retrieval for room information.<br>Error: ' + (error.error.message || error.error);
        } else {
            this.statusRef.element('#status').innerHTML = 'Room information has been loaded. Room is ready for user to join.';
            this.statusRef.element('#start').style.display = 'block';
        }
      });

    function start(event) {
        event.target.style.visibility = 'hidden';
        skylink.joinRoom({
          audio: true,
          video: true
        }, function (error, success) {
          if (error) {
            document.getElementById('status').innerHTML = 'Failed joining room.<br>' +
        'Error: ' + (error.error.message || error.error);
          } else {
            document.getElementById('status').innerHTML = 'Joined room.';
          }
      });
}

      // skylink.init(config, function (error, success) {
      //   if (success) {
      //     skylink.joinRoom({
      //       audio: true,
      //       video: true
      //     });
      //   }
      // });
  }


// getParameterByName(name: string, url: string): string {
//       if (!url)  {
//         url = window.location.href;
//       }
//       name = name.replace(/[\[\]]/g, '\\$&');
//       const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i'),
//           results = regex.exec(url);
//       if (!results)  {
//         return null;
//       }
//       if (!results[2]) {
//         return '';
//       }
//       return decodeURIComponent(results[2].replace(/\+/g, ' '));
//   }


}

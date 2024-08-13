import { Injectable, OnDestroy } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
  export class MessageService implements OnDestroy {
    constructor() {
        window.addEventListener('message', this.receiveMessage.bind(this), false);
        console.log('Message listener added.');
      }

      receiveMessage(event: MessageEvent) {

        console.log('Data received:', event.data);
        // Verify the origin of the message
        if (event.origin !== 'http://localhost:8080/') {
          return;
        }
        const message = event.data;
        if (message.type === 'UPDATE_DATA') {
          console.log('Data received:', message.data);
          // Handle the data as needed
        }
      }
      ngOnDestroy() {
        window.removeEventListener('message', this.receiveMessage.bind(this), false);
      }
  }

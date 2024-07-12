import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Client, Message, StompSubscription } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { filter, first, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs';
import { ChatMessage } from '../components/my-chat/my-chat.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient!: Client;
  private messageSubject_: Subject<string> = new Subject<string>();
   
  private url_ = 'ws://localhost:8081/ws';  
  constructor(private snackBar: MatSnackBar) {
      //this.connect1();  // Automatically connect when the service is instantiated
    }
  
  
// Automatically connect when the service is instantiated
  
private snackBarConfig: MatSnackBarConfig = {
  duration: 3000,
  horizontalPosition: 'right',  // Set horizontal position to right
  verticalPosition: 'top'       // Set vertical position to top (change to 'bottom' if you prefer)
};
 connect1() {
    const token = `Bearer ${localStorage.getItem('jwtToken')}`;  // Get token from local storage
    const wsUrl = token ? `${this.url_}?token=${encodeURIComponent(token)}` : this.url_;  // Append token to URL if available

    this.stompClient = new Client({
      brokerURL: wsUrl,  // WebSocket URL
      connectHeaders: {},  // No additional headers required here
      debug: (str) => {
        console.log(str);  // Log debug information from STOMP client
      },
      onConnect: (frame) => {
        console.log('Connected: ' + frame);
        this.snackBar.open('Connected to WebSocket', 'Close', this.snackBarConfig);
        this.stompClient.subscribe('/topic/greetings', (message: Message) => {
          if (message.body) {
            //here we can call send message to publish the message for user add   
            console.log("message body uzair",message.body)
            const receivedMessage = JSON.parse(message.body) as ChatMessage;
            this.messageSubject_.next(message.body);  // Emit the message body
          }
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ', frame.headers.message);
        console.error('Additional details: ', frame.body);
      },
      onWebSocketClose: () => {
        console.log('WebSocket closed');
      },
      onWebSocketError: (error) => {
        console.error('WebSocket error: ', error);
      }
    });

    this.stompClient.activate();  // Activate the STOMP client connection
  }

  sendMessage_(message: ChatMessage) {
    if (this.stompClient.connected) {  // Check if the client is connected
      this.stompClient.publish({
        destination: '/app/hello',
        body: JSON.stringify(message)
      });
    } else {
      console.error('Cannot send message. WebSocket client is not connected.');
    }
  }

  getMessages_(): Observable<string> {
    return this.messageSubject_.asObservable();  // Return the observable for message subscription
  }


  disconnect() {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.deactivate();  // Deactivate the STOMP client connection
      console.log('WebSocket connection disconnected');
    }
  }

  ngOnDestroy() {
    console.log("going to disconnect")
    this.disconnect();  // Ensure disconnection when service is destroyed
  }

}
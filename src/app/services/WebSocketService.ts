import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Client, Message, StompSubscription } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { filter, first, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs';
import { ChatMessage } from '../components/my-chat/my-chat.component';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient!: Client;
  private messageSubject_: Subject<string> = new Subject<string>();
   
  private url_ = 'ws://localhost:8081/ws';  
  constructor() {
      this.connect1();  // Automatically connect when the service is instantiated
    }
  
  
// Automatically connect when the service is instantiated
  

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
        this.stompClient.subscribe('/topic/greetings', (message: Message) => {
          if (message.body) {
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

}
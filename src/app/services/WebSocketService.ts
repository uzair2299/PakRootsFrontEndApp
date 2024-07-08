import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: WebSocket; // Add `!` to assert that `socket` will be initialized
  private url = 'ws://localhost:8081/hello'; // Your WebSocket URL
  public message$: Subject<string> = new Subject<string>();


  constructor() {
    this.connect();
  }



  private connect() {

    // Get the JWT token from wherever you have stored it
    const token = `Bearer ${localStorage.getItem('jwtToken')}`;
    const wsUrl = token ? `${this.url}?token=${encodeURIComponent(token)}` : this.url;

    console.log("web socket url",wsUrl)
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    this.socket.onmessage = (event) => {
      console.log('Message received:', event.data);
      this.message$.next(event.data);
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }


  public sendMessage(message: string) {
    console.log("socket state",this.socket.readyState)
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ message }));
    } else {
      console.warn('WebSocket is not open. Message not sent.');
    }
  }


}
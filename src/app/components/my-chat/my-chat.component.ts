import { Component } from '@angular/core';
import { WebSocketService } from '../../services/WebSocketService';
@Component({
  selector: 'app-my-chat',
  templateUrl: './my-chat.component.html',
  styleUrls: ['./my-chat.component.css'],
  providers: [WebSocketService]  // Add the WebSocketService here
})
export class MyChatComponent {
  public message: string = '';
  public messages: string[] = ["hello"];
  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.webSocketService.message$.subscribe((message) => {
      this.messages.push(message);
    });
  }



 

  public send(): void {
    if (this.message.trim()) {
      this.webSocketService.sendMessage(this.message);
      this.message = '';
    }
  }
}

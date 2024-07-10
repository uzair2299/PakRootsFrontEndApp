import { Component } from '@angular/core';
import { WebSocketService } from '../../services/WebSocketService';
import { JWTService } from 'src/app/services/JWTService';
@Component({
  selector: 'app-my-chat',
  templateUrl: './my-chat.component.html',
  styleUrls: ['./my-chat.component.css'],
  providers: [WebSocketService]  // Add the WebSocketService here
})
export class MyChatComponent {
  public message: string = '';
  public messages: string[] = ["hello"];
  public userName: string = '';  // Define the userName class variable
  public messagesArray: ChatMessage[] = [];
  constructor(private webSocketService: WebSocketService, private jwtService: JWTService) { }

  ngOnInit(): void {
    const msg1 = new ChatMessage();
    msg1.content = "testing message";
    msg1.userId = "123"
    msg1.userName = "123"
    this.messagesArray.push(msg1);

    this.userName = this.jwtService.getUserName();
    this.webSocketService.connect1();
  }





  public send(): void {
    if (this.message.trim()) {
      const message = new ChatMessage();

      message.userName = this.userName; // Replace 'YourUserName' with actual username
      message.userId = this.userName;
      message.content = this.message;
      message.isCurrentUser = true;
      this.webSocketService.sendMessage_(message);
      this.messagesArray.push(message)
      this.message = '';
    }
  }
}

export class ChatMessage {
  userName: string;
  userId: string;
  content: string;
  isCurrentUser: boolean;

  constructor() {
    this.userName = '';
    this.userId = '';
    this.content = '';
    this.isCurrentUser = false;
  }
}


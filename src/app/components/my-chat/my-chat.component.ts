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
  public userName: string = '';  // Define the userName class variable
  public messagesArray: ChatMessage[] = [];
  constructor(private webSocketService: WebSocketService, private jwtService: JWTService) { }

  ngOnInit(): void {
  
    this.userName = this.jwtService.getUserName();
    this.webSocketService.connect1();


      // Subscribe to the messages observable
      this.webSocketService.getMessages_().subscribe((message: string) => {
        const receivedMessage = JSON.parse(message) as ChatMessage;

      console.log("message update in component",receivedMessage)
        // Mark the message as sent by the current user if applicable
        this.messagesArray.push(receivedMessage);
      });
  }





  public send(): void {
    if (this.message.trim()) {
      const message = new ChatMessage();

      message.userName = this.userName; // Replace 'YourUserName' with actual username
      message.userId = this.userName;
      message.content = this.message;
      message.isCurrentUser = true;
      this.webSocketService.sendMessage_(message);
    
      this.message = '';
    }
  }
}

export class ChatMessage {
  userName: string;
  userId: string;
  content: string;
  messageTime:string;
  isCurrentUser: boolean;

  constructor() {
    this.userName = '';
    this.userId = '';
    this.content = '';
    this.messageTime='';
    this.isCurrentUser = false;
  }
}


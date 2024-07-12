import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { WebSocketService} from 'src/app/services/WebSocketService';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  
  constructor(private authService: AuthService, private router: Router,private webSocketService:WebSocketService) {}
  logout(): void {
    this.authService.logout();
    this.webSocketService.disconnect();
    // Redirect to the login page or other desired action
  this.router.navigate(['/login']);
  }
}

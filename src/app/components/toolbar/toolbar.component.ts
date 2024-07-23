import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/DataService';
import { WebSocketService } from 'src/app/services/WebSocketService';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  menu: any[] = [];

  constructor(private authService: AuthService, private router: Router, private webSocketService: WebSocketService, private dataService: DataService) { }
  logout(): void {
    this.authService.logout();
    this.webSocketService.disconnect();
    // Redirect to the login page or other desired action
    this.router.navigate(['/login']);
  }


  ngOnInit() {


    this.dataService.menu$.subscribe(menuData => {
      this.menu = menuData;
      console.log(menuData)
    });
  }

  navigateTo(child: any): void{
    console.log(child.name);
    if (child.name === 'Sign Out') {
      this.logout();
    }
  }


}

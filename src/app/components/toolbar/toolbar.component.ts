import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  
  constructor(private authService: AuthService, private router: Router) {}
  logout(): void {
    this.authService.logout();
    // Redirect to the login page or other desired action
  this.router.navigate(['/login']);
  }
}

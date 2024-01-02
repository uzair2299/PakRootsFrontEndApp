import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  constructor(private router: Router) {}
  goToLogin() {
    this.router.navigate(['/login']); // Adjust the route based on your actual route configuration
}

}

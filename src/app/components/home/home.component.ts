import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService  } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentDate: Date = new Date();
  constructor(private authService: AuthService, private router: Router) {}
  logout(): void {
    this.authService.logout();
    // Redirect to the login page or other desired action
  this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.currentDate = new Date();
  }
}


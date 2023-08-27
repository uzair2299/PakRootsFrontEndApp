import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  logout(): void {
    localStorage.removeItem('token'); // Remove the JWT token from local storage
  }
}

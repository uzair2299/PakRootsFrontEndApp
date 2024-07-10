import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


interface JwtPayload {
  userName: string;
  // Add other fields from the token payload if needed
}

@Injectable({
  providedIn: 'root'
})
export class JWTService {

  constructor() { }

  getUserNameFromToken(token: string): string {
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      return decodedToken.userName;
    } catch (error) {
      console.error('Failed to decode token:', error);
      throw new Error('Invalid token');
    }
  }

  // Function to get the JWT token from local storage or another source
  getToken(): string | null {
    return localStorage.getItem('jwtToken');  // Or another way to get the token
  }
  // Function to extract userName using the token
  getUserName(): string {
    const token = this.getToken();
    if (token) {
      return this.getUserNameFromToken(token);
    }
    throw new Error('No token found');
  }

}


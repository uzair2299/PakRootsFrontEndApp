import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private apiService: ApiService) { }


  login(login: any): Observable<boolean> {
    return this.apiService.login(login).pipe(
      tap((response: any) => {
        if (response && response.token) {
          const token = response.token;
          console.log("login token is ", token);
          const parts = response.token.split('.');


          // Decode the payload (the second part)
          const payload = JSON.parse(atob(parts[1]));
          console.log("payload of token is ", payload);

          const expirationTimeInSeconds = payload.exp; // Expiration time in seconds
          const currentTimeInSeconds = Math.floor(Date.now() / 1000);

          if (expirationTimeInSeconds && expirationTimeInSeconds >= currentTimeInSeconds) {
            // Token is not expired
            console.log('Token is valid. Expiration time:', new Date(expirationTimeInSeconds * 1000));
            localStorage.setItem('jwtToken', response.token); // Store the JWT token in local storage
            this.isAuthenticatedSubject.next(true);
          } else {
            // Token has expired
            console.log('Token has expired.');
          }
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove the JWT token from local storage
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';
import { ApiService } from './api.service'; 
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // constructor(private http: HttpClient) { }
  // public login(login: any) {
  //   return this.http.post(`${baseURL}/api/v1/login/`, login)
  // }
  constructor(private apiService: ApiService) {}


  login(login: any): Observable<boolean> {
    return this.apiService.login(login).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token); // Store the JWT token in local storage
          this.isAuthenticatedSubject.next(true); // Update the authentication status
        }
      })
    );
  }
  
}

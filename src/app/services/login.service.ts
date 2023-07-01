import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  public login(login: any) {
    return this.http.post(`${baseURL}/api/v1/login/`, login)
  }
}

import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public login = {
    userName: '',
    password: ''
  }

  constructor(private loginService: LoginService) { }

  submitForm() {
    console.log(this.login.userName);
    console.log(this.login.password);

    this.loginService.login(this.login).pipe(
      catchError(error => {
        console.error(error);
        return of(null); // return an observable with a default value or handle the error gracefully
      })
    )
    .subscribe(response => {
      console.log(response);
      // handle the response data
    });
    


  }
}

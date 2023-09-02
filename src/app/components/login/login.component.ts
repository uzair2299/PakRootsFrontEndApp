import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';

AuthService
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';


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

  constructor(private authService: AuthService,
    private router: Router) { }

  submitForm() {
    console.log(this.login.userName);
    console.log(this.login.password);

    this.authService.login(this.login)
      .subscribe( success => {
        console.log("response from login",success)
        if (success) {
          // Redirect to the desired page upon successful login
          this.router.navigate(['/home']);
        } else {
          // Handle login failure, show error message, etc.
        }
      });



  }
}

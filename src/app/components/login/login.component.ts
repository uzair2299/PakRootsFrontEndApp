import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';

AuthService
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';



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


//To validate a password pattern in Angular reactive forms, you can use a pattern validator. You can define a regular expression that represents the desired password pattern and use it in the pattern attribute of the FormControl.  
//At least 8 characters
//At least one lowercase letter
//At least one uppercase letter
//At least one digit

  loginForm = new FormGroup({
    userName : new FormControl('testing',Validators.required),
    password : new FormControl('asdfghjQ1',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
  });

  constructor(private authService: AuthService,
    private router: Router) { }

  submitForm() {
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value)
        .subscribe(
          {
            next: (data: any) => {
              // Handle successful login
              this.router.navigate(['/home']);
            },
            error: (error: any) => {
              // Handle error (including ERR_CONNECTION_REFUSED)
              console.error('Login failed:', error);
            },
            complete: () => {
              // Handle completion (if needed)
            }
          })
        }
    else{
      console.error("Invalid form check user input",this.loginForm.value);
    }

  }
}

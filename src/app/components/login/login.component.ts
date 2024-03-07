import { Component,Output,EventEmitter } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/DataService';

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
    password : new FormControl('asdfghA1',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
  });

  constructor(private authService: AuthService,
    private router: Router,
    private dataService: DataService) { }

  submitForm() {
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      const dataToSend = 'Hello from Component A';
      this.dataService.emitData(dataToSend);
      this.authService.login(this.loginForm.value)
        .subscribe(
          {
            next: (data: any) => {
              console.log(data);
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
      //this.router.navigate(['/home']);    
    }
        
    else{
      console.error("Invalid form check user input",this.loginForm.value);
    }

  }
}

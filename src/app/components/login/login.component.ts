import { Component, Output, EventEmitter, Renderer2 } from '@angular/core';
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


  ngOnInit(): void {
    const currentUrl = window.location.href;
    console.log("currentUrl from login", currentUrl)
    const params = new URLSearchParams(window.location.search);
    const username = params.get("username");
    if (username) {
      const decodedUsername = decodeURIComponent(username);
      console.log('Username:', decodedUsername);
    } else {
      console.error('Username is null');
    }

    this.renderer.listen('window', 'message', this.receiveMessage.bind(this));
  }


  receiveMessage(event: MessageEvent) {


    const messageData = event.data;
    console.log('Data received from parent app:', messageData);
    if (messageData.data === undefined || messageData.data === null) {
      console.warn('Received data is undefined or null');
      return;
  }

    const message = JSON.parse(messageData);
    const eventName = message.eventName;
    console.log('Event origin:', event.origin);
    console.log('Event Name:', eventName);

    // Verify the origin of the message
    if (event.origin !== 'http://localhost:8080') {
      console.warn('Origin mismatch');
      return;
    }




    if (eventName === 'State') {
      console.log('Data received for State:', messageData);
      console.log('state:', message.state);
    }
    // if (eventName === 'InboundCall') {

    //   console.log('Data received for InboundCall:', messageData);
    //   console.log('InboundCall call state:', message.state);
    //   if(message.state==='ACTIVE'){
    //     console.log('InboundCall call state is active');
    //     const SM_Ind =  this.extractValue(message.callVariables, 'user.SM_Ind');
    //     console.log('Extracted SM_Ind:', SM_Ind);
    //     console.log('Extracted dialogID:', message.dialogID);
    //     console.log('callType from event message:', message.callType);
    //     console.log('callType from event dialogID:', message.dialogID);
    //   }
    // }
    // if (eventName === 'NewInboundCall') {
    //   console.log('Data received for NewInboundCall:', messageData);
    //   console.log('callType from event message:', message.callType);
    //   console.log('DialogId from event message:', message.dialogID);
    //   console.log('callVariables from event message:', message.callVariables);
    //   const ani_ =  this.extractValue(message.callVariables,'ani');
    //   const User_ani =  this.extractValue(message.callVariables,'user.ANI');
    //   const user_DN =  this.extractValue(message.callVariables,'user.DN');
    //   const callid =  this.extractValue(message.callVariables,'callid');

    //   const variablesArray = message.callVariables.split('|');
    //   console.log('callVariables from event message:', variablesArray);
    //   const aniEntry: string | undefined = variablesArray.find((varString: string) => varString.startsWith('ani='));
    //   const ani: string | undefined = aniEntry ? aniEntry.split('=')[1] : undefined;

    //   console.log('Extracted ANI:', ani_);
    //   console.log('Extracted User_ani:', User_ani);
    //   console.log('Extracted user_DN:', user_DN);
    //   console.log('Extracted callid:', callid);
    // }




    // const messageData = event.data;
    // console.log('Data received from parent app:', event.data);
    // const eventName = messageData.eventName;
    // console.log('Event Name:', eventName);
    // // Verify the origin of the message
    // if (event.origin !== 'http://localhost:8080/') {
    //   return;
    // }
    // const message = event.data;
    // if (message.type === 'UPDATE_DATA') {
    //   console.log('Data received:', message.data);
    //   // Handle the data as needed
    // }

    // if (eventName === 'NewInboundCall') {
    //   console.log('Data received for NewInboundCall:', messageData);
    // }
  }
  ngOnDestroy() {
    window.removeEventListener('message', this.receiveMessage.bind(this), false);
  }
  //To validate a password pattern in Angular reactive forms, you can use a pattern validator. You can define a regular expression that represents the desired password pattern and use it in the pattern attribute of the FormControl.  
  //At least 8 characters
  //At least one lowercase letter
  //At least one uppercase letter
  //At least one digit

  loginForm = new FormGroup({
    userName: new FormControl('john_doe', Validators.required),
    password: new FormControl('asdfghA1', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
  });

  other_newtwork_ani: string = '';
  msisdn: string = '';
  constructor(private authService: AuthService,
    private router: Router,
    private dataService: DataService,
    private renderer: Renderer2) { }

  submitForm() {
    const currentUrl = window.location.href;
    const params = new URLSearchParams(window.location.search);
    console.log('parms', params);
    console.log('Current URL:', currentUrl);
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      const dataToSend = 'Hello from Component A';
      this.dataService.emitData(dataToSend);
      this.other_newtwork_ani = '9355222555';
      // this.msisdn = '55222555';
      // if (this.other_newtwork_ani !== undefined && this.other_newtwork_ani !== '') {
      //   console.log("msisDn" + this.msisdn + "- other_newtwork_ani" + this.other_newtwork_ani);
      //   if (this.other_newtwork_ani !== '92' + this.msisdn) {
      //     console.log("msisDn", this.msisdn);
      //     var ani = this.other_newtwork_ani.substring(2);
      //     console.log("ani", ani);
      //     //this.msisdn = ani;
      //     console.log("msisDn", this.msisdn);
      //   }
      // }

      this.authService.login(this.loginForm.value)
        .subscribe(
          {
            next: (data: any) => {
              console.log(data);
              this.dataService.setMenuData(data.menuList)
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

    else {
      console.error("Invalid form check user input", this.loginForm.value);
    }

  }

  extractValue(data: string, key: string): string | undefined {
    const variablesArray: string[] = data.split('|');
    const entry: string | undefined = variablesArray.find((varString: string) => varString.startsWith(`${key}=`));
    return entry ? entry.split('=')[1] : undefined;
  }
}

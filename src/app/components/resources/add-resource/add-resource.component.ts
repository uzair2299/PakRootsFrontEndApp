import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';


interface MethodType {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent {
  selectedMethod: string = '';


  constructor(public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private httpService: HttpService,
    private router:Router
  ) {
    this.selectedMethod = '';
  }


  httpMethods: { value: string, viewValue: string }[] = [
    { value: 'GET', viewValue: 'GET' },
    { value: 'POST', viewValue: 'POST' },
    { value: 'PUT', viewValue: 'PUT' },
    { value: 'DELETE', viewValue: 'DELETE' },
    { value: 'PATCH', viewValue: 'PATCH' },
    { value: 'OPTIONS', viewValue: 'OPTIONS' },
    { value: 'HEAD', viewValue: 'HEAD' },
    { value: 'CONNECT', viewValue: 'CONNECT' },
    { value: 'TRACE', viewValue: 'TRACE' }
  ];

  navigateToResource() {
    this.router.navigate([`/resources`]);
  }

  resourceForm = new FormGroup({
    resourceName : new FormControl('',Validators.required),
    resourceEndpoint : new FormControl('',Validators.required),
    version : new FormControl('',Validators.required),
    isActive : new FormControl(false,Validators.required),
    methodType : new FormControl('',Validators.required),
    isAuthRequired : new FormControl(false,Validators.required),
    isDeprecated : new FormControl(false,Validators.required),
  });

  submitForm() {
    if(this.resourceForm.valid){
      console.log(this.resourceForm.value);
      this.httpService.post<any>('http://localhost:8081/api/v1/resources/createResource',this.resourceForm.value).pipe(
        catchError(error => {
          console.error('Error in POST request:', error);
          // Handle the error here or re-throw it to propagate
          // return throwError(error); // Uncomment this line if you want to propagate the error
          return throwError(() => error); // Or return a new observable with the error
        })
      )
      .subscribe({
        next: response => {
          console.log('POST request successful:', response);
          this.resourceForm.reset() // Reset the form after successful API call
          this.openSnackBar('Successfully added...!'); // Show snackbar
          this.navigateToResource();
        },
        error: error => {
          console.error('Error in POST request:', error);
        }
      });
    }
    else{
      console.error("Invalid form check user input",this.resourceForm.value);
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000, // Duration in milliseconds
      horizontalPosition: 'end', // Positioning the snackbar horizontally
      verticalPosition: 'top', // Positioning the snackbar vertically
    });
  }
}



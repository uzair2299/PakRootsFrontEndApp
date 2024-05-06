import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,throwError } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.css']
})
export class AddPermissionComponent {
  constructor(private httpService: HttpService, private _snackBar: MatSnackBar,){}
  permissionFrom = new FormGroup({
    permissionName : new FormControl('',Validators.required),
    description : new FormControl('')
    //password : new FormControl('description',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
  });

  submitForm() {
    if(this.permissionFrom.valid){
      console.log(this.permissionFrom.value);
      this.httpService.post<any>('http://localhost:8081/api/v1/permission',this.permissionFrom.value).pipe(
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
          this.permissionFrom.reset() // Reset the form after successful API call
          this.openSnackBar('Successfully added...!'); // Show snackbar
        },
        error: error => {
          console.error('Error in POST request:', error);
        }
      });
    }
    else{
      console.error("Invalid form check user input",this.permissionFrom.value);
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

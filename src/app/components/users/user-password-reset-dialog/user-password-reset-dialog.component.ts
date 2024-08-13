import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { API_ENDPOINTS } from 'src/app/const/api.config';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-user-password-reset-dialog',
  templateUrl: './user-password-reset-dialog.component.html',
  styleUrls: ['./user-password-reset-dialog.component.css']
})
export class UserPasswordResetDialogComponent {

  
  constructor(
    private httpService : HttpService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserPasswordResetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number}
  ) {}

  resetPassword = new FormGroup({
    newPassword: new FormControl('asdfghA1', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
    confirmPassword: new FormControl('asdfghA1', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
  });

  ngOnInit(): void {
    console.log("User Id",this.data.id);
  }

  onCancel() {
    // Close the dialog
    console.log("going to close the reset password dialog")
    this.dialogRef.close();
  }

  submitForm(){
    if (this.resetPassword.valid) {

      //JavaScript's object spread syntax to create a new object that combines the data from the form with the user ID
      const formData = {
        ...this.resetPassword.value,
        id: this.data.id
      };

      console.log(formData);
      this.httpService.post<any>(API_ENDPOINTS.users_resetPasswordV1,formData).pipe(
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
          this.resetPassword.reset() // Reset the form after successful API call
          this.dialogRef.close();
          this.openSnackBar('Password has been successfully reset')
        },
        error: error => {
          console.error('Error in POST request:', error);
        }
      });
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
